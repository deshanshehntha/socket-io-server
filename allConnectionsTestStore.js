class ConnectedNodeStore {

    _data = [];
    static _peerNodeConnectionList = []

    constructor() {
        this._data = [];
        ConnectedNodeStore._peerNodeConnectionList = [];
    }

    add(url, childNodeArray) {
        const UserStore = require("./clientDataStore");
        let tempArr = [];
        tempArr = childNodeArray;

        let obj = {
            id : url,
            loaded : true,
            age : 22,
            name : "S1"
        }
        this._data.push(obj);

        if(tempArr.length !== 0) {
            tempArr.forEach(function (obj) {
                let i;
                console.log("count"+ i++)
                let peerObj = {
                    id : Date.now(),
                    from : obj.url,
                    to : url,
                    type : "friend"
                }
                ConnectedNodeStore._peerNodeConnectionList.push(peerObj);

            })

        }
        if(UserStore.find(url) === true) {
            let peerObj = {
                id : Date.now(),
                from : url,
                to : "SERVER",
                type : "friend"
            }
            ConnectedNodeStore._peerNodeConnectionList.push(peerObj);
        }


    }
    getAll() {
        // return this._data.find(d => d.id === id);
        return this._data;
    }

    removeAll() {
        this._data = [];
        ConnectedNodeStore._peerNodeConnectionList = [];
    }

    getConnectionDetails() {
        let serverObj = {
            id : "SERVER",
            loaded : true,
            age : 22,
            name : "S1"
        }
        this._data.push(serverObj);

      let obj = {
          nodes : this._data,
          links : ConnectedNodeStore._peerNodeConnectionList
      }
      return obj;
    }
}

const instance = new ConnectedNodeStore();

module.exports = instance;
