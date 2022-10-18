
const ARList = require("../ARList");
const Reaction = require("./reaction");
const DeezerLike = require('./deezerLike');
const DiscordMessage = require('./discordMessage');

class ReactionList extends ARList {

    constructor() {
        super("reactions", Reaction);
        this.add(DeezerLike, "deezer_reaction_like", "Deezer Like", "Likes the track on Deezer", "deezer");
        this.add(DiscordMessage, "discord_reaction_message", "Discord Message", "Sends message on discord", "discord");
    }

    stop(server) {
        DiscordMessage.stop();
    }
}

module.exports = ReactionList;