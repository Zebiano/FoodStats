// Requires
const schemaUser = require('/home/ubuntu/workspace/backend/model/schemas/user.schema.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');
const jwt = require("jsonwebtoken");

// Get
function getUser(req, res) {
    // Searches for Users
    schemaUser.modelUser.find(function(err, resultUsers) {
        //If there is an error, informs the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            if (resultUsers.length == 0 || resultUsers == null) {
                res.status(404).send("Não existem utilizadores.");
            }
            else {
                res.status(200).json({ users: resultUsers });
            }
        }
    });
};

function getUserById(req, res) {
    //Holds the user's id 
    const userId = req.params.id;

    //Finds the user
    schemaUser.modelUser.findById(userId, function(err, resultUser) {
        //If there is an error, infroms the user
        if (err) {
            res.status(404).send("O utilizador que pretende encontrar não existe.");
        }
        //Sends the user information to the user
        else {
            if (resultUser == undefined || resultUser == null) {
                res.status(404).send("O utilizador que pretende encontrar não existe.");
            }
            else {
                res.status(200).json({ user: resultUser });
            }
        }
    })
};

// Post
function postUser(req, res) {

    let username = req.body.username;
    let password = req.body.password;

    schemaUser.modelUser.find(function(err, resultUsers) {
        // If there is an error, informs the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {

            //Checks if there is a username and password to add a new user, if not, warns the user
            if ((username == undefined || username == "") || (password == undefined || password == "")) {
                res.status(400).send("Insira um username e password.");
            }
            else {

                const exists = verifications.verifyIfUserExists(username, resultUsers);

                //Checks if the new user exists in the database
                if (exists) {
                    res.status(400).send("Já existe um utilizador com o username escolhido.");
                }
                else {

                    let encryptedPassword = verifications.encryptPassword(password);

                    // Create new model to add
                    const newUser = schemaUser.modelUser({
                        username: username,
                        password: encryptedPassword
                    });



                    // Saves the new user
                    newUser.save(function(err) {
                        // If there is an error, informs the user
                        if (err) {
                            res.status(400).send("Error saving the ingredient: " + err);
                        }
                        // Informs the user that the new user was saved to the database
                        else {
                            res.status(200).send("Utilizador adicionado com sucesso.");
                        }
                    })
                }
            }
        }
    })
};

// Update
function updateUser(req, res) {
    //Holds user's id
    const userId = req.params.id;

    // New username to update
    let newUsername = req.body.username;
    let newPassword = req.body.password;

    // Finds the user with the given id
    schemaUser.modelUser.findById(userId, function(err, resultUser) {
        //If there is an error, informs the user
        if (err) {
            res.status(404).send("O utilziador que pretende atualizar não existe.");
        }
        else {
            if (resultUser == undefined || resultUser == null) {
                res.status(400).send("O utilizador que pretende atualizar não existe.");
            }
            // Checks if a new username or password exists, if not, informs the user
            else if ((newUsername == undefined || newUsername == "") && (newPassword == undefined || newPassword == "")) {
                res.status(400).send("Insira um username ou password para atualizar o utilizador.");
            }
            else {
                //Finds all the users
                schemaUser.modelUser.find(function(err, resultUsers) {
                    if (err) {
                        res.status(400).send("Error: " + err);
                    }
                    else {

                        //Checks if there is a user in the database with the inserted username
                        const exists = verifications.verifyIfUserExists(newUsername, resultUsers);

                        let repeatedChange = "";

                        if (exists) {
                            repeatedChange = "exists";
                        }

                        //Checks if a new username exists
                        if (newUsername != undefined && newUsername != "") {
                            //Checks if the new username and old one are the same
                            if (resultUser.username == newUsername) {
                                repeatedChange = "username";
                            }
                            //Updates user's username
                            else {
                                resultUser.set({ username: newUsername });
                            }
                        }

                        //Checks if a new password exists
                        if (newPassword != undefined && newPassword != "") {

                            let checkPassword = verifications.comparePasswords(newPassword, resultUser.password);

                            //Checks if the new password and the old one are the same
                            if (checkPassword) {
                                repeatedChange = "password";
                            }
                            //Updates user's password
                            else {
                                let encryptedPassword = verifications.encryptPassword(newPassword);

                                resultUser.set({ password: encryptedPassword });
                            }
                        }

                        if (repeatedChange != "") {
                            switch (repeatedChange) {
                                case "username":
                                    res.status(400).send("O username inserido é igual ao username atual do utilizador.");
                                    break;
                                case "password":
                                    res.status(400).send("A password inserida é igual à password atual do utilizador.");
                                    break;
                                case "exists":
                                    res.status(400).send("Já existe um utilizador com o username inserido.");
                                    break;

                            }
                        }
                        //Saves the updated user
                        else {
                            resultUser.save(function(err) {
                                if (err) {
                                    res.status(400).send("Error: " + err);
                                }
                                else {
                                    res.status(200).send("Utilizador atualizado com sucesso.");
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
function deleteUser(req, res) {
    //Holds user's id
    const userId = req.params.id;

    //Finds the user with the given ID
    schemaUser.modelUser.findById(userId, function(err, resultUser) {
        //If there is an error, infroms the user
        if (err) {
            res.status(404).send("O utilizador que pretende eliminar não existe.");
        }
        else {
            //Checks if the user was found
            if (resultUser == null || resultUser.length == 0) {
                res.status(404).send("O utilizador que pretende eliminar não existe.");
            }
            //Deletes the user
            else {
                resultUser.delete();
                res.status(200).send("Utilizador eliminado com sucesso.");
            }
        }
    })
};

function verifyLogin(req, res) {
    //console.log(req.body);

    //Holds username and password from the request body
    const username = req.body.username;
    const password = req.body.password;


    //Finds the user
    schemaUser.modelUser.find({ username: username }, function(err, user) {
        if (err) {
            throw err;
        }
        else {
            //Warns that the user does not exist
            if (user.length == 0) {
                res.status(404).send("Utilizador não encontrado.");
            }
            //Warns the user that a password is required to login
            else if (password == undefined || password == "" ) {
                res.status(400).send("Insira uma password.");
            }
            else {
                //Checks if the password is correct, if not, warns the user
                if (!verifications.comparePasswords(password, user[0].password)) {
                    res.status(400).send("Password incorreta.");
                }
                else {
                    //Sends a token to the user
                    jwt.sign({ user: user }, "secretkey", {expiresIn: "5m"}, function(err, token) {
                        res.json({
                            token: token
                        });
                    });
                }
            }
        }
    })

}

// Exports
module.exports = {
    getUser: getUser,
    getUserById: getUserById,
    postUser: postUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    verifyLogin: verifyLogin
};
