
const ARList = require("../ARList");
const Action = require("./action");
const SpotifyLike = require("./spotifyLike");
const Weather = require("./weatherAction");

class ActionList extends ARList {

    constructor() {
        super("actions", Action);
        this.add(SpotifyLike);
        this.add(Weather);
    }
}

module.exports = ActionList;