// --- Requires --- \\
const express = require('express');
const server = require('/home/ubuntu/workspace/backend/server.js');
const bodyParser = require('body-parser');

// --- Middleware --- \\
server.app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true })); // Body-parser
server.app.use(express.static(__dirname + '/public/')); // Public folder
server.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    if ('OPTIONS' === req.method) {
        res.status(204).send();
    }
    else {
        next();
    }
}); // Ignore CORS

// --- Assets --- \\
require('/home/ubuntu/workspace/backend/assets/connect.js'); // Conetar com a base de dados

// --- Routes --- \\
require('/home/ubuntu/workspace/backend/routes/main.route.js');
require('/home/ubuntu/workspace/backend/routes/database/menu.route.js');
require('/home/ubuntu/workspace/backend/routes/database/ingredient.route.js');
require('/home/ubuntu/workspace/backend/routes/database/dish.route.js');
require('/home/ubuntu/workspace/backend/routes/database/arduino.route.js');
require('/home/ubuntu/workspace/backend/routes/database/user.route.js');

//let request = require('/home/ubuntu/workspace/backend/tests/requests.js');
