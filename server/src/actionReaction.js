
const ActionList = require("./actions/actionList");
const ReactionList = require("./reactions/reactionList");
const registerServices = require("./services");

let actionList = new ActionList();
let reactionList = new ReactionList();

class ActionReaction {
    id;
    action;
    reaction;
    userId;

    constructor(id, userId, actionId, reactionId) {
        this.id = id;
        this.userId = userId;
        this.action = actionList.find(actionId, id, userId)
        this.reaction = reactionList.find(reactionId, id, userId);
    }

    async tick(areabase) {
        let events = await this.action.events(areabase);
        for (let event of events) {
            await this.reaction.ingest(event, areabase);
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