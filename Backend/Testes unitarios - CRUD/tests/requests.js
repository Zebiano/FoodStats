// Requires
const axios = require('axios');

// --- INGREDIENTS --- \\
// GET Ingredients
function getIngredients(headers) {
    return axios.get('https://projeto-sd-zebiano.c9users.io/ingredients', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response.data);
            return response;
        });
}

// POST Ingredients
function postIngredients(headers) {
    return axios.post('https://projeto-sd-zebiano.c9users.io/ingredients', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// UPDATE Ingredients
function updateIngredients(headers) {
    return axios.put('https://projeto-sd-zebiano.c9users.io/ingredients/id', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// DELETE Ingredients
function deleteIngredients(headers) {
    return axios.delete('https://projeto-sd-zebiano.c9users.io/ingredients/id', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// --- DISHES --- \\
// GET Dishes
function getDishes(headers) {
    return axios.get('https://projeto-sd-zebiano.c9users.io/dishes', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// POST Dishes
function postDishes(headers) {
    return axios.post('https://projeto-sd-zebiano.c9users.io/dishes', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// UPDATE Dishes
function updateDishes(headers) {
    return axios.put('https://projeto-sd-zebiano.c9users.io/dishes/id', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// DELETE Dishes
function deleteDishes(headers) {
    return axios.delete('https://projeto-sd-zebiano.c9users.io/dishes/id', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// --- MENUS --- \\
// GET Menus
function getMenus(headers) {
    return axios.get('https://projeto-sd-zebiano.c9users.io/menus', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// POST Menus
function postMenus(headers) {
    return axios.post('https://projeto-sd-zebiano.c9users.io/menus', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// UPDATE Menus
function updateMenus(headers) {
    return axios.put('https://projeto-sd-zebiano.c9users.io/menus/id', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// DELETE Menus
function deleteMenus(headers) {
    return axios.delete('https://projeto-sd-zebiano.c9users.io/menus/id', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// --- USERS --- \\
// GET Users
function getUsers(headers) {
    return axios.get('https://projeto-sd-zebiano.c9users.io/users', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// POST Users
function postUsers(headers) {
    return axios.post('https://projeto-sd-zebiano.c9users.io/users', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// UPDATE Users
function updateUsers(headers) {
    return axios.put('https://projeto-sd-zebiano.c9users.io/users/id', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// DELETE Users
function deleteUsers(headers) {
    return axios.delete('https://projeto-sd-zebiano.c9users.io/users/id', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// --- ARDUINOS --- \\
// GET Arduinos
function getArduinos(headers) {
    return axios.get('https://projeto-sd-zebiano.c9users.io/arduinos', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// POST Arduinos
function postArduinos(headers) {
    return axios.post('https://projeto-sd-zebiano.c9users.io/arduinos', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// UPDATE Arduinos
function updateArduinos(headers) {
    return axios.put('https://projeto-sd-zebiano.c9users.io/arduinos/id', {}, {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// DELETE Arduinos
function deleteArduinos(headers) {
    return axios.delete('https://projeto-sd-zebiano.c9users.io/arduinos/id', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// --- MAIN ROUTES --- \\
// GET Root
function getRoot(headers) {
    return axios.get('https://projeto-sd-zebiano.c9users.io/', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// GET Root
function getToken(headers) {
    return axios.get('https://projeto-sd-zebiano.c9users.io/token', {
            headers: headers
        })
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

// Exports
module.exports = {
    getIngredients: getIngredients,
    postIngredients: postIngredients,
    updateIngredients: updateIngredients,
    deleteIngredients: deleteIngredients,
    getDishes: getDishes,
    postDishes: postDishes,
    updateDishes: updateDishes,
    deleteDishes: deleteDishes,
    getMenus: getMenus,
    postMenus: postMenus,
    updateMenus: updateMenus,
    deleteMenus: deleteMenus,
    getUsers: getUsers,
    postUsers: postUsers,
    updateUsers: updateUsers,
    deleteUsers: deleteUsers,
    getArduinos: getArduinos,
    postArduinos: postArduinos,
    updateArduinos: updateArduinos,
    deleteArduinos: deleteArduinos,
    getRoot: getRoot,
    getToken: getToken
}
