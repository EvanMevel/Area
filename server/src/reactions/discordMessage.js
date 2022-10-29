
let discord;
const Reaction = require('./reaction');
discord = require('./discordBot/discordBot')
const ReactionDescription = require("./reactionDescription");
const EventType = require("../eventType");

class DiscordMessage extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, server) {
        return discord.writeMessage(event.string);
    }

}

function stop() {
    if (discord != null) {
        discord.stop();
    }
}

module.exports = DiscordMessage;

module.exports.stop = stop;

module.exports.description = new ReactionDescription("discord_reaction_message", "Discord Message",
    "Sends message on discord", "discord", [EventType.ALL])