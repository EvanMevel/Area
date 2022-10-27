
const ARList = require("../ARList");
const Action = require("./action");
const SpotifyLike = require("./spotifyLike");
const Weather = require("./weatherAction");
const Deezer = require("./deezerLike");

class ActionList extends ARList {

    constructor() {
        super("actions", Action);
        this.add(SpotifyLike);
        this.add(Weather);
        this.add(Deezer);
    }
}

module.exports = ActionList;