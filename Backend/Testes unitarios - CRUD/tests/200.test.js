// Requires
const requests = require('./requests.js');

// Variables
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUiLCJlbWFpbCI6ImVtYWlsIn0sImlhdCI6MTU0Njg3ODA2OH0.Zy4_i2ez6rWFod7mKsdIkfOE8ffOWWJmrFW6cDNRx2w";
const headers = {
    Authorization: token,
    JestUnityTest: true
}

// -- INGREDIENTS -- \\
// Get
test('Status 200 | /ingredients: get', async function() {
    expect.assertions(1);
    let result = await requests.getIngredients(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Post
test('Status 200 | /ingredients: post', async function() {
    expect.assertions(1);
    let result = await requests.postIngredients(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Update
test('Status 200 | /ingredients: update', async function() {
    expect.assertions(1);
    let result = await requests.updateIngredients(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Delete
test('Status 200 | /ingredients: delete', async function() {
    expect.assertions(1);
    let result = await requests.deleteIngredients(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// -- DISHES -- \\
// Get
test('Status 200 | /dishes: get', async function() {
    expect.assertions(1);
    let result = await requests.getDishes(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Post
test('Status 200 | /dishes: post', async function() {
    expect.assertions(1);
    let result = await requests.postDishes(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Update
test('Status 200 | /dishes: update', async function() {
    expect.assertions(1);
    let result = await requests.updateDishes(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Delete
test('Status 200 | /dishes: delete', async function() {
    expect.assertions(1);
    let result = await requests.deleteDishes(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// -- MENUS -- \\
// Get
test('Status 200 | /menus: get', async function() {
    expect.assertions(1);
    let result = await requests.getMenus(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Post
test('Status 200 | /menus: post', async function() {
    expect.assertions(1);
    let result = await requests.postMenus(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Update
test('Status 200 | /menus: update', async function() {
    expect.assertions(1);
    let result = await requests.updateMenus(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Delete
test('Status 200 | /menus: delete', async function() {
    expect.assertions(1);
    let result = await requests.deleteMenus(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// -- USERS -- \\
// Get
test('Status 200 | /users: get', async function() {
    expect.assertions(1);
    let result = await requests.getUsers(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Post
test('Status 200 | /users: post', async function() {
    expect.assertions(1);
    let result = await requests.postUsers(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Update
test('Status 200 | /users: update', async function() {
    expect.assertions(1);
    let result = await requests.updateUsers(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Delete
test('Status 200 | /users: delete', async function() {
    expect.assertions(1);
    let result = await requests.deleteUsers(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// -- ARDUINOS -- \\
// Get
test('Status 200 | /arduinos: get', async function() {
    expect.assertions(1);
    let result = await requests.getArduinos(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Post
test('Status 200 | /arduinos: post', async function() {
    expect.assertions(1);
    let result = await requests.postArduinos(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Update
test('Status 200 | /arduinos: update', async function() {
    expect.assertions(1);
    let result = await requests.updateArduinos(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Delete
test('Status 200 | /arduinos: delete', async function() {
    expect.assertions(1);
    let result = await requests.deleteArduinos(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// -- MAIN ROUTES -- \\
// Get Root
test('Status 200 | /: get', async function() {
    expect.assertions(1);
    let result = await requests.getRoot(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});

// Post
test('Status 200 | /token: get', async function() {
    expect.assertions(1);
    let result = await requests.getToken(headers);

    // Expect to get status 200
    expect(result.status).toEqual(200);
});