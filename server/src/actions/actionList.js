
const ARList = require("../ARList");
const Action = require("./action");
const SPOTIFY_LIKE = require("./spotify_action_like");
const GET_WEATHER = require("./get_weather_action");

class ActionList extends ARList {

    constructor() {
        super("actions", Action);
        this.add(SPOTIFY_LIKE, "spotify_action_like", "Spotify Listen Likes", "Listen to user liking a track on spotify", "spotify");
        this.add(GET_WEATHER, "get_weather_action", "Weather", "Gets Weather", "meteo_concept");
    }
}

module.exports = ActionList;