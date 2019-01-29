// Requires
const mongoose = require('mongoose');

// Variables
const Schema = mongoose.Schema;

// Schema
var schemaMenu = Schema({
   date: Date,
   dishes: []
});

// Criar Model
const Menu = mongoose.model('Menus', schemaMenu);

// Exportar Model
module.exports = {
   modelMenu: Menu
};