class ConnectionTracker {

    _data = [];

    constructor() {
        this._data = [];
    }

    add(id, mainConnectionURL, childrenConnections, timestamp) {
        let obj = {
            id : id,
            mainConnectionURL : mainConnectionURL,
            childrenConnections : childrenConnections,
            timestamp : timestamp
        }
        this._data.push(obj);
    }

    getAll() {
        // return this._data.find(d => d.id === id);
        return this._data;
    }

    remove(mainConnectionURL) {
        this._data = this._data.filter(function (obj) {
            return obj.mainConnectionURL !== mainConnectionURL;
        });
        console.log("deleted" + this._data)

    }

    getLength() {
        return this._data.length;
    }
}

const instance = new ConnectionTracker();

module.exports = instance;
