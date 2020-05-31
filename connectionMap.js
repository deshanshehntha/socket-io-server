class ConnectionMap {

    _data = [];
    allConnectionsInTheNetwork = new Map()


    constructor() {
        this._data = [];
        this.allConnectionsInTheNetwork = new Map()
    }

    add(parentNode, urls) {
        this.allConnectionsInTheNetwork.set(parentNode, urls);
    }

    addConnectionToMap(object) {
       if(!this.allConnectionsInTheNetwork.has(object.url)) {
           this._data.push(object.url)
           this.allConnectionsInTheNetwork.set(object.url,object)
        }
    }

    remove(socketId) {
        this._data = this._data.filter(function (obj) {
            return obj.socketId !== socketId;
        });
        console.log("deleted" + this._data)

    }

    getLength() {
        return this._data.length;
    }
}

const instance = new UserStore();

module.exports = instance;
