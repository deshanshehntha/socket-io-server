const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const findConnection = require("./connectionFinderAlgorithm")
const ConnectionTracker = require("./connectionsTracker")

router.get("/", (req, res) => {
    res.send({response: "im alive"}).status(200);
});

router.get("/sendBroadcastMessage", (req, res) => {
    io.emit('requesting_connection_details', { 'message': 'hello' });
    res.send('respond with a resource');
});

router.post("/getConnectionDetails", (req, res) => {
    console.log(req);
    res.send(findConnection.connectionFinder(req)).status(200);
});


module.exports = router;
