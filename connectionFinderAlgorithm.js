



module.exports.connectionFinder = function (req) {

    const UserStore = require("./clientDataStore");
    const ConnectionTracker = require("./ConnectionsTracker");

    const noOfChildConnections = 2

    const CONNECT_TO_SERVER = 1;
    const CONNECT_TO_PEER_NODE = 2;


    if(UserStore.getAll().length < noOfChildConnections) {
        return CONNECT_TO_SERVER;
    }

};
