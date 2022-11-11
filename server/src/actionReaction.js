
const {HTTPError} = require("got");

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
    user;

    constructor(id, user, actionId, reactionId) {
        this.id = id;
        this.userId = user;
        this.actionId = actionId;
        this.reactionId = reactionId;
        this.action = actionList.find(actionId, id, user);
        this.reaction = reactionList.find(reactionId, id, user);
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
            if (e instanceof HTTPError) {
                console.error(e);
                console.error(JSON.stringify(e.response.body));
                return
            }
            console.error(e);
        }
    }
}

async function registerAREA(server) {
    return Promise.all([actionList.register(server),
        reactionList.register(server)]);
}

function stop() {
    reactionList.stop();
    actionList.stop();
}

function getCompatibleReactions(actionId) {
    let action = actionList.getDescription(actionId);

    return reactionList.getAccept(action.returns);
}

function getActions() {
    return actionList.getAll();
}

module.exports = ActionReaction;

module.exports.registerAREA = registerAREA;

module.exports.loadAll = loadAll;

module.exports.stop = stop;

module.exports.getCompatibleReactions = getCompatibleReactions;

module.exports.getActions = getActions;