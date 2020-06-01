const express = require("express");
const router = express.Router();

const AllConnectionsTestStore = require("./allConnectionsTestStore");
const ConnectionTracker = require("./ConnectionsTracker");
const findConnection = require("./connectionFinderAlgorithm")

router.get("/", (req, res) => {
    res.send({response: "I am alive"}).status(200);
});

router.get("/getActiveUsers", (req, res) => {
    res.send({response: AllConnectionsTestStore.getAll()}).status(200);
});

router.get("/sendBroadcastMessage", (req, res) => {
    io.emit('status', { 'message': 'hello' });
    res.send('respond with a resource');
});

router.post("/getConnectionDetails", (req, res) => {
    console.log(req);
    res.send(findConnection.connectionFinder(req)).status(200);
});


module.exports = router;


