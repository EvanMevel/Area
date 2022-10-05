
const ActionList = require("./actions/actionList");
const ReactionList = require("./reactions/reactionList");

class ActionReaction {
    action;
    reaction;
    userId;

    constructor(userId, actionId, reactionId) {
        this.userId = userId;
        this.action = ActionList.findAction(actionId, userId)
        this.reaction = ReactionList.findReaction(reactionId, userId);
    }

    async tick() {
        let events = await this.action.events();

        for (let event in events) {
            await this.reaction.ingest(event);
        }
    }
}

module.exports = ActionReaction;