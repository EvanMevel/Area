

let actionList;
let reactionList;

async function loadAll() {
    const ActionList = require("./actions/actionList");
    const ReactionList = require("./reactions/reactionList");

    actionList = new ActionList();
    reactionList = new ReactionList();
}

class ActionReaction {
    id;
    action;
    actionId;
    reaction;
    reactionId;
    userId;

    constructor(id, userId, actionId, reactionId) {
        this.id = id;
        this.userId = userId;
        this.actionId = actionId;
        this.reactionId = reactionId;
        this.action = actionList.find(actionId, id, userId)
        this.reaction = reactionList.find(reactionId, id, userId);
    }

    async tick(server) {
        try {
            let events = await this.action.events(server);
            for (let event of events) {
                console.log("[AREA] events in " + this.id);
                this.reaction.ingest(event, server).catch((e) => {
                    console.error("Error executing event " + JSON.stringify(event));
                    console.error("With reaction " + this.reactionId)
                    console.error(e);
                });
            }
        } catch (e) {
            console.error("Error retrieving events from " + this.actionId + ": ");
            console.error(e);
        }
    }
}

async function registerAREA(areabase) {
    return Promise.all([actionList.register(areabase),
        reactionList.register(areabase)]);
}

function stop() {
    reactionList.stop();
    actionList.stop();
}

function getCompatibleReactions(actionId) {
    let action = actionList.getDescription(actionId);

    return reactionList.getAccept(action.returns);
}

module.exports = ActionReaction;

module.exports.registerAREA = registerAREA;

module.exports.loadAll = loadAll;

module.exports.stop = stop;

module.exports.getCompatibleReactions = getCompatibleReactions;