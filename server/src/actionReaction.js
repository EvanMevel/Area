
const registerServices = require("./services");

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
        let events = await this.action.events(server);
        for (let event of events) {
            console.log("[AREA] events in " + this.id);
            this.reaction.ingest(event, server);
        }
    }
}

async function registerAREA(areabase) {
    await registerServices(areabase);
    await actionList.register(areabase);
    await reactionList.register(areabase);
}

module.exports = ActionReaction;

module.exports.registerAREA = registerAREA;

module.exports.loadAll = loadAll;