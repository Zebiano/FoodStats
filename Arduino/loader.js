// --- Requires --- \\
const server = require('./server.js');
const bodyParser = require('body-parser');

// --- Middleware --- \\
// Body-parser
server.app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// --- Connect --- \
require('./assets/connect.js'); // Liga o server para falar com o arduino

// --- Main File --- \\
require('./main.js');