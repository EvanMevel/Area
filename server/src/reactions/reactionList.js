
const ARList = require("../ARList");
const Reaction = require("./reaction");
const EventType = require("../eventType");
const DeezerLike = require('./deezerLike');
//const DiscordMessage = require('./discordMessage');
const SpotifyLike = require("./spotifyLike");

class ReactionList extends ARList {

    constructor() {
        super("reactions", Reaction);
        this.add(DeezerLike);
        //this.add(DiscordMessage);
        this.add(SpotifyLike);
    }

    getAccept(type) {
        let ret = [];
        for (let id in this.list) {
            const reaction = this.list[id];
            const accept = reaction.description.accepts;
            if (accept.includes(EventType.ALL) || accept.includes(type)) {
                ret.push(structuredClone(reaction.description));
            }
        }
        return ret;
    }

    stop(server) {
        DiscordMessage.stop();
    }
}

module.exports = ReactionList;