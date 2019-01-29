const schemaArduino = require('/home/ubuntu/workspace/backend/model/schemas/arduino.schema.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');

// Get
function getArduino(req, res) {

    schemaArduino.modelArduino.find().sort({ date: "asc" }).exec(function(err, resultArduino) {
        //If there is an error, informs the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            //If there is no arduino data in the database, informs the user
            if (resultArduino.length == 0) {
                res.status(404).send("Não existem dados de arduino.");
            }
            //If there is data in the database, sends them to the user
            else {
                res.status(200).send(resultArduino);
            }
        }
    })
}


function getArduinoById(req, res) {
    //Holds arduino's id
    const arduinoId = req.params.id;

    //Finds arduino
    schemaArduino.modelArduino.findById(arduinoId, function(err, resultArduino) {
        //If there is an error, informs the user
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            //Informs the user that the arduino cannot be found
            if (resultArduino == null || resultArduino == undefined) {
                res.status(404).send("Os dados de arduino que pretende encontrar, não existem.");
            }
            //If there is data in the database, sends them to the user
            else {
                res.status(200).json({ arduino: resultArduino });
            }
        }
    });
}

//Post
function postArduino(req, res) {

    //Variables that hold data from the request body
    let arduinoDateY = req.body.date.split("-")[0];
    let arduinoDateM = req.body.date.split("-")[1];
    let arduinoDateD = req.body.date.split("-")[2];
    let arduinoType = req.body.type;

    let arduinoDate = new Date(arduinoDateY, arduinoDateM - 1, arduinoDateD);
    console.log(arduinoDateM - 1);
    console.log(arduinoDate);


    //Checks if type and date exist
    if (arduinoDate == undefined || arduinoDate == null || arduinoType == "" || arduinoType == undefined) {
        res.status(400).send("É necessário uma data e um tipo para adicionar novos dados de arduino.");
    }
    else {

        //Formats the type string
        arduinoType = verifications.formatString(arduinoType);

        //Finds all arduinos with the given type
        schemaArduino.modelArduino.find({ type: arduinoType }, function(err, resultArduino) {
            if (err) {
                res.status(400).send("Error: " + err);
            }
            else {

                //If there are no arduinos found with the given type, creates a new one
                if (resultArduino.length == 0) {
                    const newArduino = schemaArduino.modelArduino({
                        date: arduinoDate,
                        type: arduinoType,
                        dishCount: 1
                    });

                    newArduino.save(function(err) {
                        if (err) {
                            res.status(400).send("Error: " + err);
                        }
                        else {
                            res.status(200).send("Dados guardados com sucesso.");
                        }
                    })
                }
                else {

                    let sameDate = false;
                    let resultIndex;
                    let resultDate;
                    let resultDateFormated = "";

                    //Checks if any of the arduinos found has the same date as the one given in the request body, if so changes the "sameDate" variable to true and holds
                    //the index of the arduino in the "resultIndex" variable
                    for (let i = 0; i < resultArduino.length; i++) {

                        resultDate = resultArduino[i].date.toString().substr(0, 15);
                        arduinoDate = arduinoDate.toString().substr(0, 15);

                        //console.log(resultDate, arduinoDate);


                        if (resultDate == arduinoDate) {
                            sameDate = true;
                            resultIndex = i;
                        }
                    }

                    //If there is an arduino with the same date as given, adds 1 to its dish count
                    if (sameDate) {
                        resultArduino[resultIndex].set({ dishCount: resultArduino[resultIndex].dishCount + 1 });

                        resultArduino[resultIndex].save(function(err, saveResult) {
                            if (err) {
                                res.status(400).send("Error: " + err);
                            }
                            else {
                                res.status(200).send("Dados guardados com sucesso.");
                            }
                        })
                    }
                    //If no arduino is found with the same date, creates a new one
                    else {
                        const newArduino = schemaArduino.modelArduino({
                            date: arduinoDate,
                            type: arduinoType,
                            dishCount: 1
                        });

                        newArduino.save(function(err) {
                            if (err) {
                                res.status(400).send("Error: " + err);
                            }
                            else {
                                res.status(200).send("Dados guardados com sucesso.");
                            }
                        })
                    }
                }

            }
        })
    }
}

//Update
function updateArduino(req, res) {

    //Variables from the request body
    const arduinoID = req.params.id;
    const arduinoDate = req.body.date;
    let arduinoType = req.body.type;

    //Checks if there a date or type to update
    if ((arduinoDate == undefined || arduinoDate == null) && (arduinoType == undefined || arduinoType == "")) {
        res.status(400).send("É necessário uma data ou um tipo para atualizar os dados do arduino.");
    }
    else {
        //Finds the arduino by id
        schemaArduino.modelArduino.findById(arduinoID, function(err, resultArduino) {
            if (err) {
                res.status(404).send("Os dados de arduino que pretende atualizar, não foram encontrados na base de dados.");
            }
            else {
                //If the arduino cannot be found, informs the user
                if (resultArduino.length == 0 || resultArduino == undefined) {
                    res.status(404).send("Os dados de arduino que pretende atualizar, não foram encontrados na base de dados.");
                }
                else {
                    //Checks if there is a date to update, if so, updates it
                    if (arduinoDate != undefined && arduinoDate != null) {
                        resultArduino.set({ date: arduinoDate });
                    }

                    //Checks if there is a type to update, if so, updates it
                    if (arduinoType != undefined && arduinoType != "") {
                        arduinoType = verifications.formatString(arduinoType);

                        resultArduino.set({ type: arduinoType });
                    }

                    //Saves the updated arduino
                    resultArduino.save(function(err) {
                        if (err) {
                            res.status(400).send("Error: " + err);
                        }
                        else {
                            resultArduino.save(function(err) {
                                if (err) {
                                    res.status(400).send("Error: " + err);
                                }
                                else {
                                    res.status(200).send("Dados atualizados com sucesso.");
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

//Delete
function deleteArduino(req, res) {

    //Arduino id from request
    const arduinoId = req.params.id;

    //Finds arduino by id
    schemaArduino.modelArduino.findById(arduinoId, function(err, resultArduino) {
        if (err) {
            res.status(400).send("Error: " + err);
        }
        else {
            //Checks if arduino exists
            if (resultArduino == undefined || resultArduino.length == 0) {
                res.status(404).send("Os dados de arduino que pretende eliminar, não foram encontrados na base de dados.");
            }
            else {
                //Deletes arduino
                resultArduino.delete(function(err) {
                    if (err) {
                        res.status(400).send("Error: " + err);
                    }
                    else {
                        res.status(200).send("Dados eliminados com sucesso.");
                    }
                })
            }
        }
    })
}

// Exports
module.exports = {
    getArduino: getArduino,
    getArduinoById: getArduinoById,
    postArduino: postArduino,
    updateArduino: updateArduino,
    deleteArduino: deleteArduino
};
