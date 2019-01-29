// Requires
const mongoose = require('mongoose');

// Variables
const Schema = mongoose.Schema;

// Schema
var schemaIngredient = Schema({
   name: String
});

// Criar Model
const Ingredient = mongoose.model('Ingredients', schemaIngredient);

// Exportar Model
module.exports = {
   modelIngredient: Ingredient
};