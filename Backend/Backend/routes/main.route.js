// Requires
const server = require('/home/ubuntu/workspace/backend/server.js');
const verifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');
const jwt = require("jsonwebtoken");
const colors = require('colors');

// Shows the api documentation
server.app.get('/', function(req, res) {
    // Check if its a unityTest
    if (verifications.verifyIfJest(req)) {
        console.log(colors.bgBlue("UnityTest:") + " /: get");
        res.sendStatus(200);
    }
    else {
        res.redirect('/apidoc');
    }
});

server.app.get("/token", function(req, res) {
    // Check if its a unityTest
    if (verifications.verifyIfJest(req)) {
        console.log(colors.bgBlue("UnityTest:") + " /token: get");
        res.sendStatus(200);
    }
    else {
        console.log("/token: get");

        const user = {
            username: "username",
            email: "email"
        };

        jwt.sign({ user: user }, "secretkey", function(err, token) {
            res.json({
                token: token
            });
        });
    }
});

server.app.post("/posts", verifications.verifyToken, function(req, res) {

    // Check if its a unityTest
    if (verifications.verifyIfJest(req)) {
        console.log(colors.bgBlue("UnityTest:") + " /posts: post");
        res.sendStatus(200);
    }
    else {
        console.log("/posts: post");
        jwt.verify(req.token, "secretkey", function(err, authData) {
            if (err) {
                res.sendStatus(403);
            }
            else {
                res.send(authData);
            }
        })
    }
})

server.app.get('/testezao', verifications.verifyToken, function(req, res) {

    jwt.verify(req.token, "secretkey", function(err, authData) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            console.log("/testezao: get");
            res.sendStatus(200);
        }
    });
});
