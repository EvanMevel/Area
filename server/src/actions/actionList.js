
const ARList = require("../arCommons/arList");
const Action = require("./action");
const SpotifyLike = require("./spotifyLike");
const Weather = require("./weatherAction");
const Deezer = require("./deezerLike");
const Youtube = require("./youtubeTT");

class ActionList extends ARList {

    constructor() {
        super(Action);
        this.add(SpotifyLike);
        this.add(Weather);
        this.add(Deezer);
        this.add(Youtube);
    }

    getAll() {
        let ret = [];
        for (let id in this.list) {
            const action = this.list[id];
            ret.push(structuredClone(action.description));
        }
        return ret;
    }

    async registerAR(server, desc) {
        const action = {name: desc.name, displayName: desc.displayName, description: desc.description, service: {name: desc.serviceName}};
        return server.base.actions.save(action);
    }

}

module.exports = ActionList;