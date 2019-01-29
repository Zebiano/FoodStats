// Requires
const requests = require('./requests.js');

// Variables
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUiLCJlbWFpbCI6ImVtYWlsIn0sImlhdCI6MTU0Njg3ODA2OH0.Zy4_i2ez6rWFod7mKsdIkfOE8ffOWWJmrFW6cDNRx2w";
const headers = {
    Authorization: token
}

// -- INGREDIENTS -- \\
// Get
test('Ingredients are correctly saved.', async function() {
    expect.assertions(6);
    let result = await requests.getIngredients(headers);
    //console.log(result.data);

    // Expect result.data to have the following things:
    expect(typeof result.data).toBe("object");
    expect(result.data.ingredients.length).toBeGreaterThan(0);
    expect(result.data.ingredients[0]._id).toBeDefined();
    expect(typeof result.data.ingredients[0]._id).toBe("string");
    expect(result.data.ingredients[0].name).toBeDefined();
    expect(typeof result.data.ingredients[0].name).toBe("string");
});

// -- DISHES -- \\
// Get
test('Dishes are correctly saved.', async function() {
    expect.assertions(10);
    let result = await requests.getDishes(headers);
    //console.log(result.data);

    // Expect result.data to have the following things:
    expect(typeof result.data).toBe("object");
    expect(result.data.dishes.length).toBeGreaterThan(0);
    expect(typeof result.data.dishes[0]).toBe("object");
    expect(result.data.dishes[0].recipe.length).toBeGreaterThan(0);
    expect(result.data.dishes[0]._id).toBeDefined();
    expect(typeof result.data.dishes[0]._id).toBe("string");
    expect(result.data.dishes[0].name).toBeDefined();
    expect(typeof result.data.dishes[0].name).toBe("string");
    expect(result.data.dishes[0].dishType).toBeDefined();
    expect(typeof result.data.dishes[0].dishType).toBe("string");
});

// -- MENUS -- \\
// Get
test('Menus are correctly saved.', async function() {
    expect.assertions(8);
    let result = await requests.getMenus(headers);
    //console.log(result.data);

    // Expect result.data to have the following things:
    expect(typeof result.data).toBe("object");
    expect(result.data.menus.length).toBeGreaterThan(0);
    expect(typeof result.data.menus[0]).toBe("object");
    expect(result.data.menus[0].dishes.length).toBeGreaterThan(0);
    expect(result.data.menus[0]._id).toBeDefined();
    expect(typeof result.data.menus[0]._id).toBe("string");
    expect(result.data.menus[0].date).toBeDefined();
    expect(typeof result.data.menus[0].date).toBe("string");
});

// -- USERS -- \\
// Get
test('Users are correctly saved.', async function() {
    expect.assertions(9);
    let result = await requests.getUsers(headers);
    //console.log(result.data);

    // Expect result.data to have the following things:
    expect(typeof result.data).toBe("object");
    expect(result.data.users.length).toBeGreaterThan(0);
    expect(typeof result.data.users[0]).toBe("object");
    expect(result.data.users[0]._id).toBeDefined();
    expect(typeof result.data.users[0]._id).toBe("string");
    expect(result.data.users[0].username).toBeDefined();
    expect(typeof result.data.users[0].username).toBe("string");
    expect(result.data.users[0].password).toBeDefined();
    expect(typeof result.data.users[0].password).toBe("string");
});

// -- ARDUINOS -- \\
// Get
test('Arduinos are correctly saved.', async function() {
    expect.assertions(10);
    let result = await requests.getArduinos(headers);
    //console.log(result.data);

    // Expect result.data to have the following things:
    expect(result.data.length).toBeGreaterThan(0);
    expect(typeof result.data[0]).toBe("object");
    expect(result.data[0]._id).toBeDefined();
    expect(typeof result.data[0]._id).toBe("string");
    expect(result.data[0].date).toBeDefined();
    expect(typeof result.data[0].date).toBe("string");
    expect(result.data[0].type).toBeDefined();
    expect(typeof result.data[0].type).toBe("string");
    expect(result.data[0].dishCount).toBeDefined();
    expect(typeof result.data[0].dishCount).toBe("number");
});