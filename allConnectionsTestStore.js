class ConnectedNodeStore {

    _data = [];
    _peerNodeConnectionList = [];

    constructor() {
        this._data = [];
    }
    add(url, chilNodeArray) {
        let tempArr = [];
        tempArr = chilNodeArray;

        let obj = {
            id : url,
            loaded : true,
            age : 22,
            name : "S1"
        }
        this._data.push(obj);

        if(tempArr.length !== 0) {
            tempArr.forEach(function (obj) {
                let peerObj = {
                    id : Date.now(),
                    from : obj.url,
                    to : url,
                    type : "friend"
                }
                this._peerNodeConnectionList.push(peerObj);

            })
        }


    }

    getAll() {
        // return this._data.find(d => d.id === id);
        return this._data;
    }

    removeAll() {
        this._data = [];
        this._peerNodeConnectionList = [];
    }

    getConnectionDetails() {
      let obj = {
          nodes : this._data,
          links : this._peerNodeConnectionList
      }
    }
}

const instance = new ConnectedNodeStore();

module.exports = instance;
