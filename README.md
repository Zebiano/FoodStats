# FoodStats
The following project was designed to store and display data related to ingredients, recipes and dishes. Our platform is able to predict the amount of dishes that will be bought, and in doing so we hope to reduce the amount of waste created by preparing too many meals for a day. 

Keep in mind this project was developed in cloud9, which basically means all the routes and such don't work, as of now. We'll try our best to fix this, but it's quite a long process.

EDIT: I'm working on my own website where I might be able to host this project, with the database included... When (and if) it's up and running, I'll share a link!

## Authors
FoodStats was created by a group of 4 people, each one of them being responsible for different sections.

* Back-end: [Artem Polushin](https://github.com/artwewe)
* PWA and service workers: [Francisco Matos](https://github.com/fiuzwagger)
* Front-end: [Hugo Barreiro](https://github.com/HugoBar)
* Arduino: [Sebastião Barros](https://github.com/Zebiano) (me)
* Unit Testing: [Sebastião Barros](https://github.com/Zebiano) (me)

Even though we were assigned reponsibilities, everyone still worked on every section to help out! 

## Installation
Right now, it's hard to get the Back- and Front-end to work outside of cloud9. Though it's already possible to run the arduino server! (It's something ok?)

* Please consider using the latest [LTS version of NodeJs](https://nodejs.org/en/download/)!
* Keep in mind we used mLab to host our database. If you want to test out everything, you'll have to create one yourself!

Usually, a simple `npm install` works out of the box. Then `cd` into the directory and run `npm run nodemon`. I'll get into smaller details later on. 

## In-depth explanation
### Here, I'll try to explain how this whole project works, so prepare to read a lot probably!

So, our platform can be split into 5 big sections, as mentioned above. The project **had** to incldue the following:

1. Create an API with NodeJs and express in the Back-end
2. Use Vue in the Front-end
3. Use an arduino and any type of sensor
4. Run unit tests
5. Implement PWA and service workers

We ended up having 5 different servers that work independently, but at the same time contemplate each other. 

### Back-end
For the backend, we used a NodeJS, Express server that works as an API. There's a dedicated documentation created with [apidocjs](https://www.npmjs.com/package/apidoc) on the root route of the API. You can also access its `index.html` at `Backend/public/apidoc/index.html`.

At its core, we used REST to handle the follwing routes:

* `/Ingredients`
* `/Dishes`
* `/Menus`
* `/Users`
* `/Arduino`

To keep our project organised, we decided to use MVC as our file structuring system. Every controller file connects to our databse of choice, in this case [MongoDB](https://www.mongodb.com/), where we also store some sensitive data like usernames and passwords. Obviously, we implemented middleware that checks for user authentication ([JSON WebTokens](https://www.npmjs.com/package/jsonwebtoken)) and encrypted passwords with [BCrypt](https://www.npmjs.com/package/bcrypt).

### Front-end
The framework we had to use was [Vue](https://www.npmjs.com/package/vue). For frameworks inside Vue, [Bulma](https://www.npmjs.com/package/bulma) and [Buefy](https://www.npmjs.com/package/buefy) were used.

At first, we thought about using a sidebar throughout the whole project, but quickly realized it's not a good idea since we'll have to implement a PWA version of it. After thinking about it, a navbar got implemented instead and with it, you're able to navigate to the main pages of the platform.

### Arduino
We ended up using an arduino connected to 4 physical buttons as well as a [capacitivce touch sensor](https://wiki.keyestudio.com/index.php/Ks0031_keyestudio_Capacitive_Touch_Sensor). Each button represents one of the 4 dishes our canteen has: Meat, Fish, Vegetarian and Diet. Whenever a student buys a meal, its respective button should be pressed. That then sends info to our API to save the data onto our database.

As for the sensor, there weren't any that could really help us out for our project. But since we had to at least use one, we decided to give the touch sensor a try. It's sort of a little extra, regarding safety. The arduino has two states: awake and asleep. Whenever the sensor detects a touch input, the arduino either goes into sleep or awake. While asleep, none of the 4 buttons send a request to the API, and instead send a message asking to "Wake up the arduino!".

### PWA and service workers
As usual, coding an app to be mobile friendly is a challenge if you don't start thinking about it from the beginning. Which kind of happened to us, since we focused on learning vue and getting used to it. It was something new to us, so we wanted to make sure everything goes smooth enough for us to be able to create a working app in the small amount of time we had. In the end, we had to tweak every page to be mobile-friendly, and to be honest, we're quite pleased with the end result.

### Unit Testing
As far as unit tests go, we had to split them onto two servers. Unfortunately, the `asyn/await` method doesn't work on the default version of node that cloud9 uses, which is needed for async testing (for example `http requests`).

With this in mind, we kept the unit tests for verification functions of the API inside the Back-end server, and created the rest of the tests in a new server.

### Documentation
This was more of a little extra, though incredibly important! It helped everyone to easily use the API without constantly having to ask each other. 
