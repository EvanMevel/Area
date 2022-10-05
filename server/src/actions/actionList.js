
const Action = require("./action");
const FB_L_POST = require("./fb_listen_post");

let actions = {};

function addAction(id, reac) {
    actions[id] = reac;
}

function findAction(actionId, areaId, userId) {
    let ac = actions[actionId];
    if (ac == null) {
        ac = Action;
    }
    return new ac(areaId, userId);
}

addAction("facebook_action_post", FB_L_POST);

module.exports.findAction = findAction;