
const ARList = require("../arCommons/arList");
const Reaction = require("./reaction");
const EventType = require("../eventType");
const DeezerLike = require('./deezerLike');
const DiscordMessage = require('./discordMessage');

class ReactionList extends ARList {

    constructor() {
        super(function (base) {
            return base.reactions;
        }, Reaction);
        this.add(DeezerLike);
        this.add(DiscordMessage);
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

    async registerAR(server, desc) {
        const reaction = {name: desc.name, displayName: desc.displayName, description: desc.description, service: {name: desc.serviceName}};
        return server.base.reactions.save(reaction);
    }

    stop(server) {
        DiscordMessage.stop();
    }
}

module.exports = ReactionList;