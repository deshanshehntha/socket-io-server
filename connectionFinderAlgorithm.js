



module.exports.connectionFinder = function (request) {

    const UserStore = require("./clientDataStore");
    const ConnectionTracker = require("./connectionsTracker");

    const noOfChildConnections = 2

    const CONNECT_TO_SERVER = 1;
    const CONNECT_TO_PEER_NODE = 2;

    if(UserStore.getAll().length < noOfChildConnections) {
        // if(ConnectionTracker.getAll().length === 0) {
            // let connectionEntry = {
            //     id : Date.now(),
            //     mainConnectionURL : "SERVER",
            //     childrenConnections : [],
            //     timestamp : Date.now()
            // }
            // let childConnectionObject = {
            //     url : request.url,
            //     timestamp:  Date.now()
            // }
            // connectionEntry.childrenConnections.push(childConnectionObject);
            let peerConnectionEntry = {
                id : Date.now(),
                mainConnectionURL : request.url,
                childrenConnections : [],
                timestamp : Date.now()
            }
            // ConnectionTracker.add(connectionEntry);
            ConnectionTracker.add(peerConnectionEntry);

        // } else {
        //     let objIndex = ConnectionTracker.getAll().findIndex((obj => obj.mainConnectionURL === "SERVER"));
        //     let updateList =  ConnectionTracker.getAll();
        //     let childConnectionObject = {
        //         url : request.url,
        //         timestamp:  Date.now()
        //     }
        //     updateList[objIndex].childrenConnections.push(childConnectionObject);
        //     updateList[objIndex].timestamp = Date.now();
        //     let peerConnectionEntry = {
        //         id : Date.now(),
        //         mainConnectionURL : request.url,
        //         childrenConnections : [],
        //         timestamp : Date.now()
        //     }
        //     ConnectionTracker.add(peerConnectionEntry);

        // }
        let responseObj = {
            "status" : CONNECT_TO_SERVER,
            "redirectURL" : ""
        }
        return responseObj;
    } else {

        let peerConnectionEntry = {
            id : Date.now(),
            mainConnectionURL : request.url,
            childrenConnections : [],
            timestamp : Date.now()
        }
        ConnectionTracker.add(peerConnectionEntry);

        let updateList =  ConnectionTracker.getAll();
        let childConnectionsList = updateList[0].childrenConnections.slice(0);

        childConnectionsList.sort(function(a,b) {
            return a.timestamp - b.timestamp;
        });
        childConnectionsList[0].timestamp = Date.now();

        let bigCities = cities.filter(function (e) {
            return e.population > 3000000;
        });





        let objIndex = ConnectionTracker.getAll().findIndex((obj => obj.mainConnectionURL === "SERVER"));




        if(ConnectionTracker.getAll().length === 1 ) {
            console.log("Send a peer address to connect |")
            let updateList =  ConnectionTracker.getAll();
            let childConnectionsList = updateList[0].childrenConnections.slice(0);

            childConnectionsList.sort(function(a,b) {
                return a.timestamp - b.timestamp;
            });
            childConnectionsList[0].timestamp = Date.now();

            let responseObj = {
                "status" : CONNECT_TO_PEER_NODE,
                "redirectURL" : childConnectionsList[0].url
            }
            return responseObj;
        }

    }

};


