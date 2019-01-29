// --- Requires --- \\
const express = require('express');

// --- Variables --- \\
let port = 3000;

// --- Server --- \\
const app = express();

// --- Listen to port --- \\
app.listen(port, function() {
    console.log("App running on: localhost:3000");
});

// Export
module.exports = {
    app: app
};

// --- Loader --- \\
require('./loader.js'); // Tem a middleware e isso, para que o server.js fique mais vazio