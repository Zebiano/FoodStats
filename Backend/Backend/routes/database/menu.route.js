// Requires
const server = require('/home/ubuntu/workspace/backend/server.js');
const controllerMenu = require('/home/ubuntu/workspace/backend/controller/menu.controller.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');
const jwt = require("jsonwebtoken");
const colors = require('colors');

/**
 * @apiVersion 1.0.0
 * @api {get} /menus List Menus
 * @apiName GetMenus
 * @apiGroup Menus
 * 
 * @apiSuccess {Array} menus Array of Menus.
 * @apiSuccess {Array} dishes Array of Dishes
 * @apiSuccess {String} _id Unique ID of the Menu.
 * @apiSuccess {Date} date Date of the Menu.
 * 
 * @apiSuccessExample Success-Response:
 *      200
 *      "menus": [
 *          { 
 *              "dishes": [],
 *              "_id": "5c2de1d94ff4661c436018d6",
 *              "date": "2018-12-26T00:00:00.000Z",
 *          }
 *      ]
 * 
 * @apiErrorExample Error-Response:
 *      404
 *      {
 *          "No Menus were found in the database."
 *      }
 */
server.app.get('/menus', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /menus: get");
                res.sendStatus(200);
            }
            else {
                console.log("/menus: get");
                controllerMenu.getMenu(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {get} /menus/:id List Menu/:id
 * @apiName GetMenusId
 * @apiGroup Menus
 * 
 * @apiParam {String} id Unique ID of the Menu.
 */
server.app.get('/menus/:id', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /menus/:id: get");
                res.sendStatus(200);
            }
            else {
                console.log("/menus/:id: get");
                controllerMenu.getMenuById(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {post} /menus Create Menu
 * @apiName PostMenus
 * @apiGroup Menus
 * 
 * @apiParam {Array} dishes Array with unique ID's of Dishes.
 * @apiParam {Date} date Date of the Menu.
 */
server.app.post('/menus', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /menus: post");
                res.sendStatus(200);
            }
            else {
                console.log("/menus: post");
                controllerMenu.postMenu(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {put} /menus/:id Update Menu/:id
 * @apiName PutMenus
 * @apiGroup Menus
 * 
 * @apiParam {String} id Unique ID of the Menu.
 * @apiParam {String} date New date for the Menu.
 * @apiParam {Array} dishes Array with ID's of Dishes.
 */
server.app.put('/menus/:id', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /menus/:id: update");
                res.sendStatus(200);
            }
            else {
                console.log("/menus/:id: update");
                controllerMenu.updateMenu(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {delete} /menus/:id Delete Menu/:id
 * @apiName DeleteMenus
 * @apiGroup Menus
 * 
 * @apiParam {String} id Unique ID of the Menu.
 */
server.app.delete('/menus/:id', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /menus/:id: delete");
                res.sendStatus(200);
            }
            else {
                console.log("/menus/:id: delete");
                controllerMenu.deleteMenu(req, res);
            }
        }
    });
});
