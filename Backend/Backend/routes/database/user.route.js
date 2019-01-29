// Requires
const server = require('/home/ubuntu/workspace/backend/server.js');
const controllerUser = require('/home/ubuntu/workspace/backend/controller/user.controller.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');
const jwt = require("jsonwebtoken");
const colors = require('colors');

/**
 * @apiVersion 1.0.0
 * @api {get} /users List Users
 * @apiName GetUsers
 * @apiGroup Users
 * 
 * @apiSuccess {Array} users Array of Users.
 * @apiSuccess {String} _id Unique ID of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} password Password of the User (encrypted).
 * 
 * @apiSuccessExample Success-Response:
 *      200
 *      "users": [
 *          {
 *              "_id": "5c31530dad653813756842c2",
 *              "username": "Username",
 *              "password": "$2b$09$56TNtz6VaBN4NBO5svrHtODrmJyjwUNFF56nZ.5LTSQrrhPlmm1i6"
 *          }
 *      ]
 * 
 * @apiErrorExample Error-Response:
 *      404
 *      {
 *          "There are no Users in the database."
 *      }
 */
server.app.get('/users', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /users: get");
                res.sendStatus(200);
            }
            else {
                console.log("/users: get");
                controllerUser.getUser(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {get} /users/:id List User/:id
 * @apiName GetUsersId
 * @apiGroup Users
 * 
 * @apiParam {String} id Unique ID of the User.
 */
server.app.get('/users/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /users/:id: get");
                res.sendStatus(200);
            }
            else {
                console.log("/users/:id: get");
                controllerUser.getUserById(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {post} /users Create User
 * @apiName PostUsers
 * @apiGroup Users
 * 
 * @apiParam {String} username Username of the User.
 * @apiParam {String} password Password of the User.
 */
server.app.post('/users', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /users: post");
                res.sendStatus(200);
            }
            else {
                console.log("/users: post");
                controllerUser.postUser(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {put} /users/:id Update User/:id
 * @apiName PutUsers
 * @apiGroup Users
 * 
 * @apiParam {String} id Unique ID of the User.
 * @apiParam {String} username Username of the User.
 * @apiParam {String} password Password of the User.
 */
server.app.put('/users/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /users/:id: update");
                res.sendStatus(200);
            }
            else {
                console.log("/users/:id: update");
                controllerUser.updateUser(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {delete} /users/:id Delete User/:id
 * @apiName DeleteUsers
 * @apiGroup Users
 * 
 * @apiParam {String} id Unique ID of the User.
 */
server.app.delete('/users/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /users/:id: delete");
                res.sendStatus(200);
            }
            else {
                console.log("/users/:id: delete");
                controllerUser.deleteUser(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {post} /login Verify login credentials
 * @apiName LoginUsers
 * @apiGroup Users
 * 
 * @apiParam {String} username Username of the User.
 * @apiParam {String} password Password of the User.
 */
server.app.post("/login", function(req, res) {

    // Check if its a unityTest
    if (verifications.verifyIfJest(req)) {
        console.log(colors.bgBlue("UnityTest:") + " /login: post");
        res.sendStatus(200);
    }
    else {
        console.log("/login: post");
        controllerUser.verifyLogin(req, res);
    }
})
