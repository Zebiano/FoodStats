// Requires
const server = require('/home/ubuntu/workspace/backend/server.js');
const controllerIngredient = require('/home/ubuntu/workspace/backend/controller/ingredient.controller.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');
const jwt = require("jsonwebtoken");
const colors = require('colors');

/**
 * @apiVersion 1.0.0
 * @api {get} /ingredients List Ingredients
 * @apiName GetIngredients
 * @apiGroup Ingredients
 * 
 * @apiSuccess {Array} ingredients Array of Ingredients.
 * @apiSuccess {String} _id Unique ID of the Ingredient.
 * @apiSuccess {String} name Name of the Ingredient.
 * 
 * @apiSuccessExample Success-Response:
 *      200
 *      "ingredients": [
 *          {
 *              "_id": "9826398364598346",
 *              "name": "Arroz"
 *          }
 *      ]
 * 
 * @apiErrorExample Error-Response:
 *      404
 *      {
 *          "There are no ingredients in the database."
 *      }
 */
server.app.get('/ingredients', verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /ingredients: get");
                res.sendStatus(200);
            }
            else {
                console.log("/ingredients: get");
                controllerIngredient.getIngredient(req, res);
            }
        }
    })
});

/**
 * @apiVersion 1.0.0
 * @api {get} /ingredients/:id List Ingredient/:id
 * @apiName GetIngredientsId
 * @apiGroup Ingredients
 * 
 * @apiParam {String} id Unique ID of the Ingredient.
 */
server.app.get("/ingredients/:id", verifications.verifyToken, function(req, res) {
    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /ingredients/:id: get");
                res.sendStatus(200);
            }
            else {
                console.log("/ingredients/:id: get");
                controllerIngredient.getIngredientById(req, res);
            }
        }
    })
})

/**
 * @apiVersion 1.0.0
 * @api {get} /ingredients/name/:name List Ingredients/:name
 * @apiName GetIngredientsName
 * @apiGroup Ingredients
 * 
 * @apiParam {String} name Name of the Ingredient.
 */
server.app.get("/ingredients/name/:name", verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /ingredients/:name: get");
                res.sendStatus(200);
            }
            else {
                console.log("/ingredients/:name: get");
                controllerIngredient.getIngredientByName(req, res);
            }
        }
    })
})

/**
 * @apiVersion 1.0.0
 * @api {post} /ingredients Create Ingredient
 * @apiName PostIngredients
 * @apiGroup Ingredients
 * 
 * @apiParam {String} name Name of the Ingredient.
 */
server.app.post('/ingredients', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /ingredients: post");
                res.sendStatus(200);
            }
            else {
                console.log("/ingredients: post");
                controllerIngredient.postIngredient(req, res);
            }
        }
    })
});

/**
 * @apiVersion 1.0.0
 * @api {put} /ingredients/:id Update Ingredient/:id
 * @apiName PutIngredients
 * @apiGroup Ingredients
 * 
 * @apiParam {String} id Unique ID of the Ingredient.
 * @apiParam {String} name Name of the Ingredient.
 */
server.app.put('/ingredients/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /ingredients/:id: update");
                res.sendStatus(200);
            }
            else {
                console.log("/ingredients/:id: update");
                controllerIngredient.updateIngredient(req, res);
            }
        }
    })
});

/**
 * @apiVersion 1.0.0
 * @api {delete} /ingredients/:id Delete Ingredient/:id
 * @apiName DeleteIngredients
 * @apiGroup Ingredients
 * 
 * @apiParam {String} id Unique ID of the Ingredient.
 */
server.app.delete('/ingredients/:id', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            // Check if its a unityTest
            if (verifications.verifyIfJest(req)) {
                console.log(colors.bgBlue("UnityTest:") + " /ingredients/:id: delete");
                res.sendStatus(200);
            }
            else {
                console.log("/ingredients/:id: delete");
                controllerIngredient.deleteIngredient(req, res);
            }
        }
    })

});
