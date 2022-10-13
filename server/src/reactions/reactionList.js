
const ARList = require("../ARList");
const Reaction = require("./reaction");
const DEEZER_LIKE = require('./deezer_reaction_like');
const DISCORD_WEATHER = require('./discord_reaction_weather');

class ReactionList extends ARList {

    constructor() {
        super("reactions", Reaction);
        this.add(DEEZER_LIKE, "deezer_reaction_like", "Deezer Like", "Likes the track on Deezer", "deezer");
        this.add(DISCORD_WEATHER, "discord_reaction_weather", "Discord Weather", "Sends message on discord with weather", "discord");
    }
}

module.exports = ReactionList;