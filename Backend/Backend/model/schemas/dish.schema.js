// Requires
const mongoose = require('mongoose');

// Variables
const Schema = mongoose.Schema;

// Schema Dish
var schemaDish = Schema({
   name: String,
   dishType: String,
   recipe: []
});

// Criar Model
const Dish = mongoose.model('Dishes', schemaDish);

// Exportar Model
module.exports = {
   modelDish: Dish
};