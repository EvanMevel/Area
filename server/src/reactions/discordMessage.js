const Reaction = require('./reaction');

const discord = require('./discordBot/discordBot')

class DiscordMessage extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, areabase) {
        console.log(JSON.stringify(event));
        return discord.writeMessage(event.string);
    }

}

function stop() {
    discord.stop();
}

module.exports = DiscordMessage;

module.exports.stop = stop;