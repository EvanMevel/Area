
const ActionList = require("./actions/actionList");
const ReactionList = require("./reactions/reactionList");

class ActionReaction {
    id;
    action;
    reaction;
    userId;

    constructor(id, userId, actionId, reactionId) {
        this.id = id;
        this.userId = userId;
        this.action = ActionList.findAction(actionId, id, userId)
        this.reaction = ReactionList.findReaction(reactionId, id, userId);
    }

    async tick(areabase) {
        let events = await this.action.events(areabase);
        for (let event of events) {
            await this.reaction.ingest(event);
        }
    }
}

module.exports = ActionReaction;