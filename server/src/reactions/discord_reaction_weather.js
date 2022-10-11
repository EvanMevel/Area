const Discord = require('../discordBot/discordBot')
const Reaction = require('./reaction');



class DISCORD_WEATHER extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, areabase) {
        console.log(event);
        await Discord.writeMessage(event);
    }

}

module.exports = DISCORD_WEATHER;