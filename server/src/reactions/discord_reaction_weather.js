const Reaction = require('./reaction');
const discord = require('../discordBot/discordBot')

class DISCORD_WEATHER extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, areabase) {
        console.log(event);
        await discord.writeMessage(event);
    }

}

module.exports = DISCORD_WEATHER;