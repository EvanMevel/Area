
const ARList = require("../ARList");
const Reaction = require("./reaction");
const FB_POST = require("./fb_post");
const DEEZER_LIKE = require('./deezer_reaction_like');
const DISCORD_WEATHER = require('./discord_reaction_weather');

class ReactionList extends ARList {

    constructor() {
        super("reactions", Reaction);
        this.add(FB_POST, "facebook_reaction_post", "Facebook Post", "Post a facebook post", "facebook");
        this.add(DEEZER_LIKE, "deezer_reaction_like", "Deezer Like", "Likes the track on Deezer", "deezer");
        this.add(DISCORD_WEATHER, "discord_reaction_weather", "Discord Weather", "Sends message on discord with weather", "discord");
    }
}

module.exports = ReactionList;