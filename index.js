const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const findConnection = require("./connectionFinderAlgorithm");
const ConnectionTracker = require("./connectionsTracker");
const ConnectedNodeStore = require("./allConnectionsTestStore");

router.get("/", (req, res) => {
    res.send({response: "im alive"}).status(200);
});

router.get("/sendBroadcastMessage", (req, res) => {
    ConnectedNodeStore.removeAll();
    io.emit('requesting_connection_details');
    res.send('wait');

});

router.get("/getConnectionDetails", (req, res) => {
    res.send(ConnectedNodeStore.getConnectionDetails());
    ConnectedNodeStore.removeAll();
});


module.exports = router;
