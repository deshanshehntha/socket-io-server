const express = require("express");
const router = express.Router();

const AllConnectionsTestStore = require("./allConnectionsTestStore");


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

router.get("/getConnectionDetails", (req, res) => {
    io.emit('requesting_connection_details');
    res.send('respond with a resource');
});


module.exports = router;


