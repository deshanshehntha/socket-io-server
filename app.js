"use strict";
const port = process.env.PORT;
const socketIo = require("socket.io");
const axios = require("axios");
const SERVER_ID = "03S"

const UserStore = require("./clientDataStore");
const AllConnectionsTestStore = require("./allConnectionsTestStore");
/** Initiate Logging sequence */

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/1debug.log', {flags: 'w'});
var log_stdout = process.stdout;

console.log = function (d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};
/** express initialization */


const express = require("express");
const http = require("http");
const index = require("./index");

const app = express();
app.use(index);

const server = http.createServer(app);
server.listen(port, () => console.log(`Create Listening on port ${server.address().port}`));


/** create nGrok Tunnel*/

console.log("starting tunnel")

// const ngrok = require('ngrok');
// (async function() {
//     const url = await ngrok.connect(port); // https://757c1652.ngrok.io -> http://localhost:9090

    global.io = require('socket.io')(server);

    global.io.on('connection', function (socket) {
        console.log("Connected Socket = " + socket.id);

        socket.on('own_client', function () {
            console.log("My client conected")
        });

        socket.on('client_connection_request', function (data) {
            console.log("client connection request" + data.ip + " " + data.customId)
            UserStore.add(socket.id, data.customId, data.ip, Date.now());
            AllConnectionsTestStore.add(socket.id, data.customId, data.ip, Date.now())
                const address = leadershipSelectionAlgorithm(socket.id);
            socket.emit('redirect_url', address);

        });

        socket.on('disconnect', function () {
            console.log("Disconnected Socket = " + socket.id);
            UserStore.remove(socket.id);
            AllConnectionsTestStore.remove(socket.id)
        });


        socket.on('server_client', function (data) {
            console.log("Server node id" + data)

        });

        socket.on('test_data', function () {
            socket.emit('test_get_info', UserStore.getAll());
            console.log("Pushed" + UserStore.getAll())
        });

        socket.on('getting_connected_node_details', function (data) {
            console.log("Node connection details | url : " + data.url + " Connection Data : " + data.childNodes)
        });

    });

// })();


// /** create socket io client*/
//
// let client = require("socket.io-client");
// var socket1 = client.connect("http://127.0.0.1:4003");
//
//
// socket1.on('connect', function (data) {
//     var ip = require("ip");
//     socket1.emit('SERVER_CONNECT', {customId: SERVER_ID, ip: ip.address() + ":" + server.address().port});
// });
//
// socket1.on("activeNodeList", (data) => {
//     console.log("from signalling server" + data)
//     createNewPeerConnection(data)
//
// });
//
// function createNewPeerConnection(data) {
//     console.log(data);
//
//     data.forEach(function (item, index) {
//         console.log(item);
//
//         var socket1 = require('socket.io-client')("http://" + item.ip + "", {
//             forceNew: true
//         });
//
//         socket1.emit('server_client', SERVER_ID);
//
//     })
//
//
// }

function leadershipSelectionAlgorithm(socketId) {

    if(UserStore.getAll().length <= 2 ){
        console.log("Kept the connection" + UserStore.getAll().length);
            return 1;
    } else {
        UserStore.remove(socketId);
        var byDate = UserStore.getAll().slice(0);
        byDate.sort(function(a,b) {
            return a.timestamp - b.timestamp;
        });
        console.log('by date:');
        console.log(byDate);

        byDate[0].timestamp = Date.now();
        console.log(byDate[0].url);
        return byDate[0].url;
    }

}


