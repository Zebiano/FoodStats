# FoodStats
The following project was designed to store and display data related to ingredients, recipes and dishes. Our platform is able to predict the amount of dishes that will be bought, and in doing so we hope to reduce the amount of waste created by preparing too many meals for a day. 

Keep in mind this project was developed in cloud9, which basically means all the routes and such don't work, as of now. We'll try our best to fix this, but it's quite a long process.

## Authors
FoodStats was created by a group of 4 people, each one of them being responsible for different sections.

1. Back-end: [Artem Polushin](link)
2. PWA and service workers: [Francisco Matos](https://github.com/fiuzwagger)
3. Front-end: [Hugo Barreiro](https://github.com/HugoBar)
4. Arduino: [Sebastião Barros](https://github.com/Zebiano) (me)
5. Unity Tests: [Sebastião Barros](https://github.com/Zebiano) (me)

Even though we were assigned reponsibilities, everyone still worked on every section to help out! 

## Installation
Right now, it's hard to get the Back- and Front-end to work outside of cloud9. Though it's already possible to run the arduino server! (It's something ok?)

Please consider using the latest [LTS version of NodeJs](https://nodejs.org/en/download/)!

Usually, a simple `npm install` works out of the box. Then `cd` into the directory and run `npm run nodemon`. I'll get into smaller details later on.

## In-depth explanation
Here, I'll try to explain how this whole project works, so prepare to read a lot probably!

So, we had the 
The following topics had to be covered:

1. Create an API with NodeJs and express in the Back-end
2. Use Vue in the Front-end
3. Use an arduino and any type of sensor
4. Run unity tests
5. Implement PWA and service workers

We ended up using an arduino connected to 4 physical buttons as well as a capacitivce touch sensor. Each button represents one of the 4 dishes our canteen has: Meat, Fish, Vegetarian and Diet. Whenever a student buys a meal,
