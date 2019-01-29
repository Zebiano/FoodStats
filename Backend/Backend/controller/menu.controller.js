// Requires
const schemaMenu = require('/home/ubuntu/workspace/backend/model/schemas/menu.schema.js');
const schemaDish = require('/home/ubuntu/workspace/backend/model/schemas/dish.schema.js');

// Get
function getMenu(req, res) {

    schemaMenu.modelMenu.find().sort({ date: "asc" }).exec(function(err, resultMenus) {
        //If there is an error, infroms the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            //Checks if there are any menus in the database
            if (resultMenus.length == 0) {
                res.status(404).send("Não existem ementas na base de dados.");
            }
            //Sends the menus to the user
            else {
                res.status(200).json({ menus: resultMenus });
            }
        }
    })
}

function getMenuById(req, res) {

    //Holds the menu Id
    const menuId = req.params.id;

    //Finds the menu
    schemaMenu.modelMenu.findById(menuId, function(err, resultMenu) {
        //If there is an error, informs the user
        if (err) {
            res.status(400).send("A ementa que pretende encontrar não existe na base de dados.");
        }
        else {
            //Informs the user that the menu cannot be found
            if (resultMenu == null || resultMenu == undefined) {
                res.status(400).send("A ementa que pretende encontrar não existe na base de dados.");
            }
            //Sends the menu to the user
            else {
                res.status(200).json({ menu: resultMenu });
            }
        }
    })
}

// Post
function postMenu(req, res) {

    //Array that keeps the dishes' id's
    const arrayDishesId = req.body.dishes;
    //Array that keeps the dishes' objects
    let arrayDishesObj = [];
    let menuDate = req.body.date;

    //Checks if there is an dishes array
    if (arrayDishesId == undefined || arrayDishesId.length == 0) {
        res.status(400).send("É necessário inserir pratos para adicionar um menu.");
    }
    else if (menuDate == undefined || menuDate == null || menuDate == "") {
        res.status(400).send("É necessário inserir uma data para adicionar um menu.");
    }
    else {
        //Gets all the dishes from the database
        schemaDish.modelDish.find(function(err, resultDish) {
            //Checks if there is an error, if so, informs the user
            if (err) {
                res.status(400).send("Error: " + err);
            }
            else {
                //Gets all the menus from the database
                schemaMenu.modelMenu.find(function(err, resultMenu) {
                    if (err) {
                        res.status(400).send("Error: " + err);
                    }
                    else {

                        let repeatedDate = false;
                        menuDate = menuDate.split("00")[0];

                        for (let i = 0; i < resultMenu.length; i++) {
                            let resultMenuDate = resultMenu[i].date.toString().split("00")[0];

                            if (menuDate == resultMenuDate) {
                                repeatedDate = true;
                                break;
                            }
                        }

                        if (repeatedDate) {
                            res.status(400).send("Já existe um menu com a data inserida.");
                        }
                        else {

                            //Fills the arrayDishesObject with the dishes objects related to the dishes' id's in the arrayDishesId
                            for (let i = 0; i < resultDish.length; i++) {
                                for (let j = 0; j < arrayDishesId.length; j++) {
                                    if (arrayDishesId[j] == resultDish[i]._id) {
                                        arrayDishesObj.push(resultDish[i]);
                                    }
                                }
                            }

                            if (arrayDishesId.length != arrayDishesObj.length) {
                                res.status(400).send("Pelo menos um dos pratos inseridos não existe na base de dados.");
                            }
                            else {
                                //Creates a new menu model
                                const newMenu = schemaMenu.modelMenu({
                                    date: menuDate,
                                    dishes: arrayDishesObj
                                });

                                //Saves the new menu 
                                newMenu.save(function(err) {
                                    if (err) {
                                        res.status(400).send("Error: " + err);
                                    }
                                    else {
                                        res.status(200).send("Ementa adicionada com sucesso.");
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    }
}

// Update
function updateMenu(req, res) {

    //Variables from request body
    const menuId = req.params.id;
    let newDate = req.body.date;
    const arrayDishesId = req.body.dishes;
    
    
    console.log(menuId);
    console.log(newDate);
    console.log(arrayDishesId);
    

    //Finds all the menus in the database
    schemaMenu.modelMenu.findById(menuId, function(err, resultMenuId) {
        //If there is an error informs the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            //If there are no menus in the database to show, informs the user
            if (resultMenuId == null || resultMenuId == undefined) {
                res.status(400).send("A ementa que pretende atualizar não existe");
            }
            //Checks if a new date or new dishes were added in the request, if not, informs the user
            else {
                if ((newDate == null || newDate == undefined) && (arrayDishesId == undefined || arrayDishesId.length == 0)) {
                    res.status(400).send("Insira uma data ou uma receita para atualizar a ementa.");
                }
                else {
                    //Finds all the dishes in the database
                    schemaDish.modelDish.find(function(err, resultDishes) {
                        //If there is an error, informs the user 
                        if (err) {
                            res.status(400).send("Error: " + err);
                        }
                        else {
                            //Variable that holds the dishes' objects
                            let arrayDishesObj = [];
                            //Variable that keeps information about the updates
                            let change = "";

                            //Checks if there is a new date to update, if so, updates it
                            if (newDate != null && newDate != undefined) {
                                    resultMenuId.set({ date: newDate });
                                
                            }

                            //Checks if there are new dishes to update, if so, updates them
                            if (arrayDishesId != undefined) {

                                //Populates the arrayDishesObj with the dishes' objects related to the dishes' id's given in the request body
                                for (let i = 0; i < resultDishes.length; i++) {
                                    for (let j = 0; j < arrayDishesId.length; j++) {
                                        if (arrayDishesId[j] == resultDishes[i]._id) {
                                            arrayDishesObj.push(resultDishes[i]);
                                        }
                                    }
                                }

                                if (arrayDishesObj.length != arrayDishesId.length) {
                                    change = "dishes";
                                }
                                else {

                                    let repeatedMenuIndex = checkRepeatedDishes(arrayDishesId, resultMenuId);

                                    // console.log("ResultMenuId: " + typeof(resultMenuId));
                                    // console.log("ArrayDishesId: " + arrayDishesId);
                                    // console.log("Repeated menu index: " + repeatedMenuIndex);

                                    if (repeatedMenuIndex != undefined) {
                                        change = "sameDishes";
                                    }
                                    else {
                                        resultMenuId.set({ dishes: arrayDishesObj });
                                    }

                                    //Checks if there are any repeated changes, if so, informs the user
                                    if (change != "") {
                                        switch (change) {
                                            case "date":
                                                res.status(400).send("A data inserida é igual à data atual da ementa.");
                                                break;
                                            case "dishes":
                                                res.status(400).send("Pelo menos um dos pratos não existe.");
                                                break;
                                            case "sameDishes":
                                                res.status(400).send("A receita inserida é igual à receita atual da ementa.");
                                        }
                                    }
                                    //Saves the updated menu
                                    else {
                                        resultMenuId.save(function(err) {
                                            if (err) {
                                                res.status(400).send("Error: " + err);
                                            }
                                            else {
                                                resultMenuId.save(function(err) {
                                                    if (err) {
                                                        res.status(400).send("Error: " + err);
                                                    }
                                                    else {
                                                        res.status(200).send("Ementa atualizada com sucesso.");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }
    });
}

// Delete
function deleteMenu(req, res) {

    //Holds the menu id given in the request
    const menuId = req.params.id;

    //Finds the menu with the given ID
    schemaMenu.modelMenu.findById(menuId, function(err, resultMenu) {
        //If there is an error, infroms the user
        if (err) {
            res.status(404).send("A ementa que pretende eliminar não existe.");
        }
        //Deletes the menu
        else {

            if (resultMenu == undefined || resultMenu == null) {
                res.status(404).send("A ementa que pretende eliminar não existe.");
            }
            else {
                resultMenu.delete();
                res.status(200).send("Ementa eliminada com sucesso.");
            }
        }
    })
}

function checkRepeatedDishes(arrayId, menu) {
    //Holds the repeated dishes count
    let repeatedDishes = 0;
    //Holds the menu index
    let menuIndex;

    // console.log("Repeated Dishes: " + repeatedDishes);
    // console.log("ArrayId Length: " + arrayId.length);
    // console.log("ArrayMenu Length: " + arrayMenu.length);

    //Checks if menu is an array of objects or a single object
    if (menu.length == undefined) {
        //Checks if the ids' in the arrayId are the same as the dishes ids' in the menu
        for (let i = 0; i < menu.dishes.length; i++) {
            for (let j = 0; j < arrayId.length; j++) {
                if (arrayId[j] == menu.dishes[i]._id) {
                    repeatedDishes++;
                }

                if (repeatedDishes == arrayId.length && arrayId.length == menu.dishes.length) {
                    menuIndex = 0;
                    break;
                }
            }
        }
    }
    else {
        for (let i = 0; i < menu.length; i++) {
            repeatedDishes = 0;
            for (let j = 0; j < menu[i].dishes.length; j++) {
                for (let k = 0; k < arrayId.length; k++) {

                    //Checks if the dishes id's are the same as in a given menu
                    if (arrayId[k] == menu[i].dishes[j]._id) {
                        repeatedDishes++;
                    }

                    //If the repeated dishes count is the same as the arrayId length and the menu dishes array length, returns the menu's index
                    if (repeatedDishes == arrayId.length && arrayId.length == menu[i].dishes.length) {
                        menuIndex = i;
                        break;
                    }
                }
            }
        }
    }
    return menuIndex;
}

// Exports
module.exports = {
    getMenu: getMenu,
    getMenuById,
    getMenuById,
    postMenu: postMenu,
    updateMenu: updateMenu,
    deleteMenu: deleteMenu
};
