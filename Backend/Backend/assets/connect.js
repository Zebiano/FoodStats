// Require
const mongoose = require('mongoose');

// Variables
const mongoURL = "mongodb://admin:Admin123@ds159387.mlab.com:59387/foodstats";

// Code to execute
mongoose.connect(mongoURL, {useNewUrlParser: true}, function(err, client) {
    if (err) {
        console.log("Database: ❌")
        console.log(err);
    }
    else {
        console.log("DataBase: ✔️");
    };
});
