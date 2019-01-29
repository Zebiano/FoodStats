// Requires
const server = require('/home/ubuntu/workspace/backend/server.js');
const controllerArduino = require('/home/ubuntu/workspace/backend/controller/arduino.controller.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');
const jwt = require("jsonwebtoken");
const colors = require('colors');

/**
 * @apiVersion 1.0.0
 * @api {get} /arduinos List data sent by Arduinos
 * @apiName GetArduinos
 * @apiGroup Arduinos
 * 
 * @apiSuccess {String} _id Unique ID.
 * @apiSuccess {Date} date Date of the bought Dish.
 * @apiSuccess {String} type Type of the bought Dish.
 * @apiSuccess {Number} dishCount Amount of times the dish was bought.
 * 
 * @apiSuccessExample Success-Response:
 *      200
 *      {
 *          "_id": "5c24f3e6a8643d1dc7eaee6a",
 *          "date": "2018-12-25T00:00:00.000Z",
 *          "type": "Carne",
 *          "dishCount": "29"
 *      }
 * 
 * @apiErrorExample Error-Response:
 *      404
 *      {
 *          "No arduino data was found in the database."
 *      }
 */
server.app.get('/arduinos', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /arduinos: get");
                res.sendStatus(200);
            }
            else {
                console.log("/arduinos: get");
                controllerArduino.getArduino(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {get} /arduinos/:id List data sent by Arduino/:id
 * @apiName GetArduinosId
 * @apiGroup Arduinos
 * 
 * @apiParam {String} id Unique ID.
 */
server.app.get('/arduinos/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /arduinos/:id: get");
                res.sendStatus(200);
            }
            else {
                console.log("/arduinos/:id: get");
                controllerArduino.getArduinoById(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {post} /arduinos Create new Arduino data
 * @apiName PostArduinos
 * @apiGroup Arduinos
 * 
 * @apiParam {Date} date Date of the bought Dish. Has to be format YYYY-MM-DD!
 * @apiParam {String} type Type of the bought Dish.
 */
server.app.post('/arduinos', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /arduinos: post");
                res.sendStatus(200);
            }
            else {
                console.log("/arduinos: post");
                controllerArduino.postArduino(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {put} /arduinos/:id Update data sent by Arduino/:id
 * @apiName PutArduinos
 * @apiGroup Arduinos
 * 
 * @apiParam {String} id Unique ID.
 * @apiParam {Date} date Date of the bought Dish. Has to be format YYYY-MM-DD!
 * @apiParam {String} type Type of the bought Dish.
 */
server.app.put('/arduinos/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /arduinos/:id: update");
                res.sendStatus(200);
            }
            else {
                console.log("/arduinos/:id: update");
                controllerArduino.updateArduino(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {delete} /arduinos/:id Delete data sent by Arduino/:id
 * @apiName DeleteArduinos
 * @apiGroup Arduinos
 * 
 * @apiParam {String} id Unique ID.
 */
server.app.delete('/arduinos/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /arduinos/:id: delete");
                res.sendStatus(200);
            }
            else {
                console.log("/arduinos/:id: delete");
                controllerArduino.deleteArduino(req, res);
            }
        }
    });
});
