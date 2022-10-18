
const ARList = require("../ARList");
const Action = require("./action");
const SpotifyLike = require("./spotifyLike");
const Weather = require("./weatherAction");

class ActionList extends ARList {

    constructor() {
        super("actions", Action);
        this.add(SpotifyLike, "spotify_action_like", "Spotify Listen Likes", "Listen to user liking a track on spotify", "spotify");
        this.add(Weather, "weather_action", "Weather", "Get Weather information", "meteo_concept");
    }
}

module.exports = ActionList;