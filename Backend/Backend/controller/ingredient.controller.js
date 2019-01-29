// Requires
const schemaIngredient = require('/home/ubuntu/workspace/backend/model/schemas/ingredient.schema.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');

// Get
function getIngredient(req, res) {
    schemaIngredient.modelIngredient.find().sort({ name: "asc" }).exec(function(err, resultIngredients) {
        //If there is an error, informs the user
        if (err) {
            res.status(400).send("Erro: " + err);
        }
        else {
            if (verifications.verifyLength(resultIngredients.length, 0)) {
                res.status(404).send("Não existem ingredientes na base de dados.");
            }
            else {
                res.status(200).json({ ingredients: resultIngredients });
            }
        }
    })
};

function getIngredientById(req, res) {
    //Holds the ingredient id 
    const ingredientId = req.params.id;

    //Finds the ingredient
    schemaIngredient.modelIngredient.findById(ingredientId, function(err, resultIngredient) {
        //If there is an error, infroms the user
        if (err) {
            res.status(404).send("O ingrediente que pretende encontrar não existe na base de dados.");
        }
        //Sends the ingredient to the user
        else {
            if (resultIngredient == undefined || resultIngredient == null) {
                res.status(404).send("O ingrediente que pretende encontrar não existe na base de dados.");
            }
            else {
                res.status(200).json({ ingredient: resultIngredient });
            }
        }
    })
};

function getIngredientByName(req, res) {
    //Holds the ingredient name 
    const ingredientName = verifications.formatString(req.params.name);

    //Finds all ingredients
    schemaIngredient.modelIngredient.find(function(err, ingredients) {
        //If there is an error, informs the user 
        if (err) {
            res.status(500).send("Error: " + err);
        }
        else {
            //Holds all the ingredients that will be sent
            let resultIngredients = [];

            //Populates the result ingredients array
            for (let i = 0; i < ingredients.length; i++) {
                let substring = ingredients[i].name.substring(0, ingredientName.length);
                if (ingredientName == substring) {
                    resultIngredients.push(ingredients[i]);
                }
            }

            res.status(200).json({ ingredients: resultIngredients });
        }
    })
};

// Post
function postIngredient(req, res) {
    let nameIngredient = req.body.name;

    schemaIngredient.modelIngredient.find(function(err, resultIngredients) {
        // If there is an error, informs the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {

            //Checks if there is a name for the new ingredient, if not, warns the user
            if (nameIngredient == undefined || nameIngredient == "") {
                res.status(400).send("Insira o nome do ingrediente!");
            }
            else {

                //Formats the ingredient name
                nameIngredient = verifications.formatString(nameIngredient);

                const exists = verifications.verifyIfExists(nameIngredient, resultIngredients);

                //Checks if the new ingredient exists in the database
                if (exists) {
                    res.status(500).send("O ingrediente já existe!");
                }
                else {
                    // Create new model to add
                    const newIngredient = schemaIngredient.modelIngredient({
                        name: nameIngredient
                    });

                    // Saves the new ingredient
                    newIngredient.save(function(err) {
                        // If there is an error, informs the user
                        if (err) {
                            res.status(400).send("Error saving the ingredient: " + err);
                        }
                        // Informs the user that the new ingredient was saved to the database
                        else {
                            res.status(200).send("Ingrediente adicionado com sucesso.");
                        }
                    })
                }
            }
        }
    })
};

// Update
function updateIngredient(req, res) {
    // ID of the ingredient
    const ingredientId = req.params.id;

    // New name to update
    let newNameIngredient = req.body.name;

    // Finds the ingredient with the given id
    schemaIngredient.modelIngredient.findById(ingredientId, function(err, resultIngredient) {
        //If there is an error, informs the user
        if (err) {
            res.status(404).send("O ingrediente que pretende atualizar não existe na base de dados.");
        }
        else {
            // Checks if a new name to update exists, if not, informs the user
            if (newNameIngredient == "" || newNameIngredient == undefined) {
                res.status(400).send("Insira um nome para atualizar o ingrediente.");
            }
            else {
                //Finds all the ingredients
                schemaIngredient.modelIngredient.find(function(err, resultIngredients) {
                    if (err) {
                        res.status(400).send("Error: " + err);
                    }
                    else {
                        // Formats the new ingredient name
                        newNameIngredient = verifications.formatString(newNameIngredient);

                        const exists = verifications.verifyIfExists(newNameIngredient, resultIngredients);

                        // Checks if the new ingredient name is the same as the old one
                        if (resultIngredient.name == newNameIngredient) {
                            res.status(400).send("O nome inserido é igual ao nome atual do ingrediente.");
                        }
                        //Checks if the new ingredient name already exists in the database, if so, informs the user
                        else if (exists) {
                            res.status(400).send("Já existe um ingrediente com o nome inserido na base de dados.");
                        }
                        else {
                            //Updates the ingredient name
                            resultIngredient.set({ name: newNameIngredient });

                            //Saves the updated ingredient
                            resultIngredient.save(function(err) {
                                if (err) {
                                    res.status(400).send("Error: " + err);
                                }
                                else {
                                    res.status(200).send("Ingrediente atualizado com sucesso.");
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

// Delete
function deleteIngredient(req, res) {
    //Id of the ingredient
    const ingredientId = req.params.id;

    //Finds the ingredient with the given ID
    schemaIngredient.modelIngredient.findById(ingredientId, function(err, resultIngredient) {
        //If there is an error, infroms the user
        if (err) {
            res.status(404).send("O ingrediente que pretende eliminar não existe na base de dados.");
        }
        else {
            //Checks if the ingredient was found
            if (resultIngredient == null || resultIngredient.length == 0) {
                res.status(404).send("O ingrediente que pretende eliminar não existe na base de dados.");
            }
            //Deletes the ingredient
            else {
                resultIngredient.delete();
                res.status(200).send("Ingrediente removido com sucesso!");
            }
        }
    })
};

// Exports
module.exports = {
    getIngredient: getIngredient,
    getIngredientById: getIngredientById,
    getIngredientByName: getIngredientByName,
    postIngredient: postIngredient,
    updateIngredient: updateIngredient,
    deleteIngredient: deleteIngredient
};
