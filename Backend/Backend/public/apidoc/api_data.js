define({ "api": [
  {
    "version": "1.0.0",
    "type": "delete",
    "url": "/arduinos/:id",
    "title": "Delete data sent by Arduino/:id",
    "name": "DeleteArduinos",
    "group": "Arduinos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/arduino.route.js",
    "groupTitle": "Arduinos"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/arduinos",
    "title": "List data sent by Arduinos",
    "name": "GetArduinos",
    "group": "Arduinos",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the bought Dish.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the bought Dish.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "dishCount",
            "description": "<p>Amount of times the dish was bought.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200\n{\n    \"_id\": \"5c24f3e6a8643d1dc7eaee6a\",\n    \"date\": \"2018-12-25T00:00:00.000Z\",\n    \"type\": \"Carne\",\n    \"dishCount\": \"29\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404\n{\n    \"No arduino data was found in the database.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/database/arduino.route.js",
    "groupTitle": "Arduinos"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/arduinos/:id",
    "title": "List data sent by Arduino/:id",
    "name": "GetArduinosId",
    "group": "Arduinos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/arduino.route.js",
    "groupTitle": "Arduinos"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/arduinos",
    "title": "Create new Arduino data",
    "name": "PostArduinos",
    "group": "Arduinos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the bought Dish. Has to be format YYYY-MM-DD!</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the bought Dish.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/arduino.route.js",
    "groupTitle": "Arduinos"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/arduinos/:id",
    "title": "Update data sent by Arduino/:id",
    "name": "PutArduinos",
    "group": "Arduinos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the bought Dish. Has to be format YYYY-MM-DD!</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the bought Dish.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/arduino.route.js",
    "groupTitle": "Arduinos"
  },
  {
    "version": "1.0.0",
    "type": "delete",
    "url": "/dishes/:id",
    "title": "Delete Dish/:id",
    "name": "DeleteDishes",
    "group": "Dishes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Dish.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/dish.route.js",
    "groupTitle": "Dishes"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/dishes",
    "title": "List Dishes",
    "name": "GetDishes",
    "group": "Dishes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dishes",
            "description": "<p>Array of Dishes.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of the Dish.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Dish.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dishType",
            "description": "<p>Type of the Dish.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "recipe",
            "description": "<p>Array of recipes for that dish.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200\n\"dishes\": [\n    { \n        \"recipe\": [\n            { \n                \"name\": \"Queijo\",\n                \"quantity\": \"2\"\n            },\n            { \n                \"name\": \"Pao\",\n                \"quantity\": \"1\"\n            }\n        ],\n        \"_id\": \"5c1b8baedb30177b6d9e8f37\",\n        \"name\": \"Tosta Queijo\",\n        \"dishType\": \"Carne\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404\n{\n    \"No dishes were found in the database.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/database/dish.route.js",
    "groupTitle": "Dishes"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/dishes/:id",
    "title": "List Dish/:id",
    "name": "GetDishesId",
    "group": "Dishes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Dish.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/dish.route.js",
    "groupTitle": "Dishes"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/dishes/name/:name",
    "title": "List Dishes/:name",
    "name": "GetDishesName",
    "group": "Dishes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Dish.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/dish.route.js",
    "groupTitle": "Dishes"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/dishes/type/:type",
    "title": "List Dishes/:type",
    "name": "GetDishesType",
    "group": "Dishes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the Dish.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/dish.route.js",
    "groupTitle": "Dishes"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/dishes",
    "title": "Create Dish",
    "name": "PostDishes",
    "group": "Dishes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ingName",
            "description": "<p>Array with the names (String) of the Ingredients you want to add to the dish.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ingQuantity",
            "description": "<p>Array with the quantities (Integer) of the Ingredients you want to add to the dish. Has to be integers.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Dish.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the Dish.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/dish.route.js",
    "groupTitle": "Dishes"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/dishes/:id",
    "title": "Update Dish/:id",
    "name": "PutDishes",
    "group": "Dishes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Dish.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newName",
            "description": "<p>New name for the Dish.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Type of the Dish.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "recipe",
            "description": "<p><strong>Array of objects.</strong> Each object has an Ingredient and a Quantity. Check /dishes to get an idea.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/dish.route.js",
    "groupTitle": "Dishes"
  },
  {
    "version": "1.0.0",
    "type": "delete",
    "url": "/ingredients/:id",
    "title": "Delete Ingredient/:id",
    "name": "DeleteIngredients",
    "group": "Ingredients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Ingredient.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/ingredient.route.js",
    "groupTitle": "Ingredients"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/ingredients",
    "title": "List Ingredients",
    "name": "GetIngredients",
    "group": "Ingredients",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "ingredients",
            "description": "<p>Array of Ingredients.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of the Ingredient.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Ingredient.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200\n\"ingredients\": [\n    {\n        \"_id\": \"9826398364598346\",\n        \"name\": \"Arroz\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404\n{\n    \"There are no ingredients in the database.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/database/ingredient.route.js",
    "groupTitle": "Ingredients"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/ingredients/:id",
    "title": "List Ingredient/:id",
    "name": "GetIngredientsId",
    "group": "Ingredients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Ingredient.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/ingredient.route.js",
    "groupTitle": "Ingredients"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/ingredients/name/:name",
    "title": "List Ingredients/:name",
    "name": "GetIngredientsName",
    "group": "Ingredients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Ingredient.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/ingredient.route.js",
    "groupTitle": "Ingredients"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/ingredients",
    "title": "Create Ingredient",
    "name": "PostIngredients",
    "group": "Ingredients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Ingredient.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/ingredient.route.js",
    "groupTitle": "Ingredients"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/ingredients/:id",
    "title": "Update Ingredient/:id",
    "name": "PutIngredients",
    "group": "Ingredients",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Ingredient.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Ingredient.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/ingredient.route.js",
    "groupTitle": "Ingredients"
  },
  {
    "version": "1.0.0",
    "type": "delete",
    "url": "/menus/:id",
    "title": "Delete Menu/:id",
    "name": "DeleteMenus",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Menu.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/menu.route.js",
    "groupTitle": "Menus"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/menus",
    "title": "List Menus",
    "name": "GetMenus",
    "group": "Menus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "menus",
            "description": "<p>Array of Menus.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "dishes",
            "description": "<p>Array of Dishes</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of the Menu.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the Menu.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200\n\"menus\": [\n    { \n        \"dishes\": [],\n        \"_id\": \"5c2de1d94ff4661c436018d6\",\n        \"date\": \"2018-12-26T00:00:00.000Z\",\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404\n{\n    \"No Menus were found in the database.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/database/menu.route.js",
    "groupTitle": "Menus"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/menus/:id",
    "title": "List Menu/:id",
    "name": "GetMenusId",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Menu.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/menu.route.js",
    "groupTitle": "Menus"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/menus",
    "title": "Create Menu",
    "name": "PostMenus",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "dishes",
            "description": "<p>Array with unique ID's of Dishes.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the Menu.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/menu.route.js",
    "groupTitle": "Menus"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/menus/:id",
    "title": "Update Menu/:id",
    "name": "PutMenus",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the Menu.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>New date for the Menu.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "dishes",
            "description": "<p>Array with ID's of Dishes.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/menu.route.js",
    "groupTitle": "Menus"
  },
  {
    "version": "1.0.0",
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User/:id",
    "name": "DeleteUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the User.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/user.route.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/users",
    "title": "List Users",
    "name": "GetUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Array of Users.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique ID of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User (encrypted).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200\n\"users\": [\n    {\n        \"_id\": \"5c31530dad653813756842c2\",\n        \"username\": \"Username\",\n        \"password\": \"$2b$09$56TNtz6VaBN4NBO5svrHtODrmJyjwUNFF56nZ.5LTSQrrhPlmm1i6\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "404\n{\n    \"There are no Users in the database.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/database/user.route.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/users/:id",
    "title": "List User/:id",
    "name": "GetUsersId",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the User.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/user.route.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/login",
    "title": "Verify login credentials",
    "name": "LoginUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/user.route.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "name": "PostUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/user.route.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/users/:id",
    "title": "Update User/:id",
    "name": "PutUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "filename": "routes/database/user.route.js",
    "groupTitle": "Users"
  }
] });
