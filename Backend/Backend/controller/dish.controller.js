// Requires
const schemaDish = require('/home/ubuntu/workspace/backend/model/schemas/dish.schema.js');
const schemaIngredient = require('/home/ubuntu/workspace/backend/model/schemas/ingredient.schema.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');


// Get
function getDish(req, res) {

    //Finds all dishes
    schemaDish.modelDish.find().sort({ name: "asc" }).exec(function(err, resultDish) {
        //If there is an error, informs the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            //If there are no dishes in the database, informs the user
            if (resultDish.length == 0) {
                res.status(404).send("Não existem pratos na base de dados.");
            }
            //If there are dishes in the database, sends them to the user
            else {
                res.status(200).json({ dishes: resultDish });
            }
        }
    });
}

function getDishById(req, res) {

    //Holds the dish Id
    const dishId = req.params.id;

    //Finds the dish by id 
    schemaDish.modelDish.findById(dishId, function(err, resultDish) {
        //If there is an error, informs the user
        if (err) {
            res.status(404).send("O prato que pretende encontrar, não existe na base de dados.");
        }
        //Sends the dish to the user
        else {
            if (resultDish == undefined || resultDish == null) {
                res.status(404).send("O prato que pretende encontrar, não existe na base de dados.");
            }
            else {
                res.status(200).send(resultDish);
            }
        }
    })
}

function getDishByName(req, res) {
    //Holds the dish name 
    const dishName = verifications.formatString(req.params.name);

    //Finds all dishes
    schemaDish.modelDish.find(function(err, dishes) {
        //If there is an error, informs the user 
        if (err) {
            res.status(500).send("Error: " + err);
        }
        else {
            //Holds all the dishes that will be sent
            let resultDishes = [];

            //Populates the result dishes array
            for (let i = 0; i < dishes.length; i++) {
                let substring = dishes[i].name.substring(0, dishName.length);
                if (dishName == substring) {
                    resultDishes.push(dishes[i]);
                }
            }

            res.status(200).json({ dishes: resultDishes });
        }
    })
};

function getDishByType(req, res) {

    //Holds the dish Id
    const dishType = verifications.formatString(req.params.type);

    console.log("Dish Type: " + dishType);

    schemaDish.modelDish.find().sort({ name: "asc" }).exec(function(err, resultDish) {
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            if (resultDish.length == 0 || resultDish == undefined || resultDish == null) {
                res.status(404).send("Não existem pratos com o tipo inserido.");
            }
            else {
                res.status(200).send(resultDish);
            }
        }
    })
}

// Post
function postDish(req, res) {

    //Variables from request body
    let arrayIngredients = req.body.ingName;
    const arrayQuantities = req.body.ingQuantity;
    let dishName = req.body.name;
    let dishType = req.body.type;

    schemaIngredient.modelIngredient.find(function(err, resultIngredients) {
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            //Checks if the array of ingredients exists or the length is 0, if so, informs the user
            if (arrayIngredients == undefined || arrayIngredients.length == 0) {
                res.status(400).send("Não existem ingredientes para adicionar ao prato.");
            }
            else {
                //Formats the name of the given ingredients
                for (let i = 0; i < arrayIngredients.length; i++) {
                    arrayIngredients[i] = verifications.formatString(arrayIngredients[i]);
                }

                //Checks if the given ingredients exists in the database
                let exists = verifications.verifyIfExists(arrayIngredients, resultIngredients);

                // console.log(result);

                ///Informs the user that a given ingredient doesn't exist in the database
                if (!exists) {
                    res.status(400).send("Pelo menos um dos ingredientes inseridos não existe na base de dados.");
                }
                else {
                    let repeatedIngredient = false;

                    for (let i = 0; i < arrayIngredients.length; i++) {

                        for (let j = 0; j < arrayIngredients.length; j++) {

                            if ((arrayIngredients[i] == arrayIngredients[j]) && (j != i)) {
                                repeatedIngredient = true;
                                break;
                            }
                        }
                    }

                    if (repeatedIngredient) {
                        res.status(400).send("Existem 2 ingredientes com o mesmo nome na receita.");
                    }
                    //If the number of quantities and the number of ingredients is different, informs the user
                    else if (arrayIngredients.length != arrayQuantities.length) {
                        res.status(400).send("O número de ingredientes e quantidades não é o mesmo.");
                    }
                    else {

                        if (dishName == undefined || dishName == "") {
                            res.status(400).send("Insira um nome para adicionar um prato novo.");
                        }
                        else if (dishType == undefined || dishType == "") {
                            res.status(400).send("Insira um tipo para adicionar um prato novo.");
                        }
                        else {
                            //Formats the the dish name and the dish type
                            dishName = verifications.formatString(dishName);
                            dishType = verifications.formatString(dishType);

                            //Holds the ingredients for the new recipe
                            let newRecipe = [];

                            //Populates the newRecipe array with the given ingredients
                            for (let i = 0; i < arrayIngredients.length; i++) {
                                let newObject = {
                                    name: arrayIngredients[i],
                                    quantity: arrayQuantities[i]
                                };

                                newRecipe.push(newObject);
                            }

                            //Creates a new dish
                            const newDish = schemaDish.modelDish({
                                name: dishName,
                                dishType: dishType,
                                recipe: newRecipe
                            });

                            schemaDish.modelDish.find(function(err, resultDish) {
                                if (err) {
                                    res.status(400).send("Error: " + err);
                                }
                                else {
                                    //Booleans that hold information about already existing name and recipe
                                    let nameExists = verifications.verifyIfExists(dishName, resultDish);
                                    let sameRecipe = false;

                                    //Checks if the given recipe already exists
                                    for (let i = 0; i < resultDish.length; i++) {
                                        if (resultDish[i].recipe.length == newRecipe.length) {
                                            sameRecipe = verifications.verifyIfExists(newRecipe, resultDish[i].recipe);
                                        }
                                    }

                                    //If the given name or recipe already exist, informs the user
                                    if (nameExists) {
                                        res.status(400).send("Já existe um prato com o nome inserido.");
                                    }
                                    else if (sameRecipe) {
                                        res.status(400).send("Já existe um prato com a receita inserida.");
                                    }
                                    else {
                                        //Saves the new dish to the database and informs the user
                                        newDish.save(function(err) {
                                            if (err) {
                                                res.status(400).send("Error: " + err);
                                            }
                                            else {
                                                res.status(200).send("Prato guardado com sucesso.");
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }
    });
}

// Update
function updateDish(req, res) {
    //ID from url
    const dishId = req.params.id;

    //Variables from request body
    let newDishName = req.body.newName;
    let dishType = req.body.type;
    let recipe = req.body.recipe;

    //Finds the dish with the given ID
    schemaDish.modelDish.findById(dishId, function(err, resultDish) {
        //Sends the error if there is one
        if (err) {
            res.status(404).send("O prato que pretende atualizar não existe na base de dados.");
        }
        else {

            if (resultDish == undefined || resultDish == null) {
                res.status(404).send("O prato que pretende atualizar não existe na base de dados.");
            }
            //Checks if there is something to update, if not, informs the user
            else if ((newDishName == "" || newDishName == undefined) && (dishType == "" || dishType == undefined) && (recipe == undefined)) {
                res.status(400).send("Insira um nome, uma receita ou um tipo para atualizar o prato.");
            }
            else {
                //Variable that saves information about repeated changes
                let repeatedChange = "";

                //Checks if there is a dish name to update
                if (newDishName != "" && newDishName != undefined) {

                    //Formats the new dish name 
                    newDishName = verifications.formatString(newDishName);

                    //Checks if the new dish name is the same as the old one
                    if (resultDish.name == newDishName) {
                        repeatedChange = "name";

                    }
                    //Updates the dish name
                    else {
                        resultDish.set({ name: newDishName });
                    }
                }

                //Checks if there is a dish type to update
                if (dishType != "" && dishType != undefined) {

                    //Formats the dish type
                    dishType = verifications.formatString(dishType);

                    //Checks if the new dish type is the same as the old one 
                    if (resultDish.dishType == dishType) {
                        repeatedChange = "type";
                    }
                    //Updates the dish type
                    else {
                        resultDish.set({ dishType: dishType });
                    }
                }

                //Checks if there is a dish recipe to update
                if (recipe != undefined) {

                    //Formats the content of the new recipe
                    for (let i = 0; i < recipe.length; i++) {
                        recipe[i].name = verifications.formatString(recipe[i].name);
                    }

                    //Checks if the new recipe is the same as the old one
                    let repeatedRecipe = verifications.verifyIfExists(recipe, resultDish.recipe);

                    if (repeatedRecipe) {
                        repeatedChange = "recipe";
                    }
                    //Updates the dish recipe
                    else {
                        resultDish.set({ recipe: recipe });
                    }
                }

                //Checks if there were any repeated changes, if so, informs the user
                if (repeatedChange != "") {
                    switch (repeatedChange) {
                        case 'name':
                            res.status(400).send("O nome inserido é igual ao nome atual do prato.");
                            break;

                        case 'type':
                            res.status(400).send("O tipo inserido é igual ao tipo atual do prato.");
                            break;

                        case 'recipe':
                            res.status(400).send("A receita inserida é igual à receita atual do prato.");
                            break;
                    }
                }
                //Saves the dish updates
                else {
                    resultDish.save(function(err) {
                        if (err) {
                            res.status(400).send("Error: " + err);
                        }
                        else {
                            res.status(200).send("Prato atualizado com sucesso.");
                        }
                    });
                }
            }
        }
    });
}

// Delete
function deleteDish(req, res) {
    //Id from url
    const dishId = req.params.id;

    schemaDish.modelDish.findById(dishId, function(err, resultDish) {
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            if (resultDish == null) {
                res.status(404).send("O prato que pretende apagar não existe na base de dados.");
            }
            else {
                resultDish.delete();
                res.status(200).send("Prato eliminado com sucesso.");
            }
        }
    });
}

// Exports
module.exports = {
    getDish: getDish,
    getDishById: getDishById,
    getDishByName: getDishByName,
    getDishByType: getDishByType,
    postDish: postDish,
    updateDish: updateDish,
    deleteDish: deleteDish
};
