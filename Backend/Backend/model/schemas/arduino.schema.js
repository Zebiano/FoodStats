// Requires
const mongoose = require('mongoose');

// Variables
const Schema = mongoose.Schema;

// Schema Dish
var schemaArduino = Schema({
   date: Date,
   type: String,
   dishCount: Number
});

// Criar Model
const Arduino = mongoose.model('Arduinos', schemaArduino);

// Exportar Model
module.exports = {
   modelArduino: Arduino
};