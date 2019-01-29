// --- Requires --- \\
const express = require('express');

// --- Variables --- \\
let port = process.env.PORT;

// --- Server --- \\
const app = express();

// --- Listen to port --- \\
app.listen(port, function() {
    console.log("App running on: https://projeto-sd-zebiano.c9users.io");
    console.log("---");
});

// Export
module.exports = {
    app: app
};

// --- Loader --- \\
require('/home/ubuntu/workspace/backend/loader.js'); // Tem a middleware e isso, para que o server.js fique mais vazio