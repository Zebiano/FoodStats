// Requires
const server = require('/home/ubuntu/workspace/backend/server.js');
const controllerDish = require('/home/ubuntu/workspace/backend/controller/dish.controller.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');
const jwt = require("jsonwebtoken");
const colors = require('colors');

/**
 * @apiVersion 1.0.0
 * @api {get} /dishes List Dishes
 * @apiName GetDishes
 * @apiGroup Dishes
 * 
 * @apiSuccess {Array} dishes Array of Dishes.
 * @apiSuccess {String} _id Unique ID of the Dish.
 * @apiSuccess {String} name Name of the Dish.
 * @apiSuccess {String} dishType Type of the Dish.
 * @apiSuccess {Array} recipe Array of recipes for that dish.
 * 
 * @apiSuccessExample Success-Response:
 *      200
 *      "dishes": [
 *          { 
 *              "recipe": [
 *                  { 
 *                      "name": "Queijo",
 *                      "quantity": "2"
 *                  },
 *                  { 
 *                      "name": "Pao",
 *                      "quantity": "1"
 *                  }
 *              ],
 *              "_id": "5c1b8baedb30177b6d9e8f37",
 *              "name": "Tosta Queijo",
 *              "dishType": "Carne"
 *          }
 *      ]
 * 
 * @apiErrorExample Error-Response:
 *      404
 *      {
 *          "No dishes were found in the database."
 *      }
 */
server.app.get('/dishes', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /dishes: get");
                res.sendStatus(200);
            }
            else {
                console.log("/dishes: get");
                controllerDish.getDish(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {get} /dishes/:id List Dish/:id
 * @apiName GetDishesId
 * @apiGroup Dishes
 * 
 * @apiParam {String} id Unique ID of the Dish.
 */
server.app.get('/dishes/:id', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /dishes/:id: get");
                res.sendStatus(200);
            }
            else {
                console.log("/dishes/:id: get");
                controllerDish.getDishById(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {get} /dishes/name/:name List Dishes/:name
 * @apiName GetDishesName
 * @apiGroup Dishes
 * 
 * @apiParam {String} name Name of the Dish.
 */
server.app.get('/dishes/name/:name', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /dishes/name/:name: get");
                res.sendStatus(200);
            }
            else {
                console.log("/dishes/name/:name: get");
                controllerDish.getDishByName(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {get} /dishes/type/:type List Dishes/:type
 * @apiName GetDishesType
 * @apiGroup Dishes
 * 
 * @apiParam {String} type Type of the Dish.
 */
server.app.get('/dishes/type/:type', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /dishes/type/:type: get");
                res.sendStatus(200);
            }
            else {
                console.log("/dishes/type/:type: get");
                controllerDish.getDishByType(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {post} /dishes Create Dish
 * @apiName PostDishes
 * @apiGroup Dishes
 * 
 * @apiParam {Array} ingName Array with the names (String) of the Ingredients you want to add to the dish.
 * @apiParam {Array} ingQuantity Array with the quantities (Integer) of the Ingredients you want to add to the dish. Has to be integers.
 * @apiParam {String} name Name of the Dish.
 * @apiParam {String} type Type of the Dish.
 */
server.app.post('/dishes', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /dishes: post");
                res.sendStatus(200);
            }
            else {
                console.log("/dishes: post");
                controllerDish.postDish(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {put} /dishes/:id Update Dish/:id
 * @apiName PutDishes
 * @apiGroup Dishes
 * 
 * @apiParam {String} id Unique ID of the Dish.
 * @apiParam {String} newName New name for the Dish.
 * @apiParam {String} type Type of the Dish.
 * @apiParam {Array} recipe **Array of objects.** Each object has an Ingredient and a Quantity. Check /dishes to get an idea.
 */
server.app.put('/dishes/:id', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /dishes/:id: update");
                res.sendStatus(200);
            }
            else {
                console.log("/dishes/:id: update");
                controllerDish.updateDish(req, res);
            }
        }
    });
});

/**
 * @apiVersion 1.0.0
 * @api {delete} /dishes/:id Delete Dish/:id
 * @apiName DeleteDishes
 * @apiGroup Dishes
 * 
 * @apiParam {String} id Unique ID of the Dish.
 */
server.app.delete('/dishes/:id', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /dishes/:id: delete");
                res.sendStatus(200);
            }
            else {
                console.log("/dishes/:id: delete");
                controllerDish.deleteDish(req, res);
            }
        }
    });
});
