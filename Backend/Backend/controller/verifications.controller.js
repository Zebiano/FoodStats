// --- Verifications --- \\

//Requires
const bcrypt = require("bcrypt");

// Formats the ingredient name, capitalizing the first letter and lower casing the remaining letters
function formatString(nameIngredient) {
    let formatedName = "";
    let splitString = nameIngredient.split(" ");

    for (let i = 0; i < splitString.length; i++) {
        for (let j = 0; j < splitString[i].length; j++) {
            {
                if (j == 0) {
                    formatedName += splitString[i][j].toUpperCase();
                }
                else {
                    formatedName += splitString[i][j].toLowerCase();
                }
            }
        }
        if (i != splitString.length - 1) {
            {
                formatedName += " ";
            }
        }
    }
    //console.log(formatedName);

    return formatedName;
}

// Verifies if a given data exists in a given array
function verifyIfExists(data, array) {
    //If the given data is an array
    if (data.constructor === Array) {
        // console.log(data);
        // console.log(array);

        let count = 0;

        //Verifies if any of the data content is equal to the data in the given array
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (typeof(data[i]) == "object" && typeof(array[j]) == "object") {
                    if (data[i].name == array[j].name) {
                        count++;
                    }
                }
                else if (typeof(data[i]) == "string" && typeof(array[j]) == "object") {
                    if (data[i] == array[j].name) {
                        count++;
                    }
                }
                else if (typeof(data[i]) == "string" && typeof(array[j]) == "string") {
                    if (data[i] == array[j]) {
                        count++;
                    }
                }
                else if (data[i].name == array[j]) {
                    count++;
                }
            }
        }
        if (count == data.length) {
            return true;
        }
        else {
            return false;
        }
    }
    //If the given data is not an array
    else {
        
        for (let i = 0; i < array.length; i++) {
            if (typeof(array[i]) == "object" && array[i].name == data) {
                return true;
            }
            else if (array[i] == data) {
                return true;
            }
            
        }
        return false;
    }
}

function verifyIfUserExists(username, users) {
    
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            return true;
        }
    }
    
    return false;
}

// Verifies if the first parameter.length has the length of the second parameter
function verifyLength(length, data) {
    if (length == data) {
        //console.log("Length is the same as data");
        return true;
    }
    else {
        //console.log("Length is NOT the same as data");
        return false;
    }
}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader != undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}

function encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

function comparePasswords(password, encryptedPassword){
    return bcrypt.compareSync(password, encryptedPassword);
}

// verifies if the values sent are for testing purposes
function verifyIfJest(req) {
    //console.log(req.header("jestunitytest"));
    if (req.header("jestunitytest")) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    formatString: formatString,
    verifyIfExists: verifyIfExists,
    verifyIfUserExists: verifyIfUserExists,
    verifyLength: verifyLength,
    verifyToken: verifyToken,
    verifyIfJest: verifyIfJest,
    encryptPassword: encryptPassword,
    comparePasswords: comparePasswords
}
