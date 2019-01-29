// Requires
const mongoose = require('mongoose');

// Variables
const Schema = mongoose.Schema;

// Schema
var schemaUser = Schema({
   username: String,
   password: String
});

// Criar Model
const User = mongoose.model('User', schemaUser);

// Exportar Model
module.exports = {
   modelUser: User
};