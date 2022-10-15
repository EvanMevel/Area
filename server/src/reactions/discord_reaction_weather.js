const Reaction = require('./reaction');

const discord = require('../discordBot/discordBot')

class DISCORD_WEATHER extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, areabase) {
        console.log(JSON.stringify(event));
        discord.writeMessage(event.string);
    }

}

function stop() {
    discord.stop();
}

module.exports = DISCORD_WEATHER;

module.exports.stop = stop;