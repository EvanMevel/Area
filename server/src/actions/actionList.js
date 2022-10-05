
const Action = require("./action");
const FB_L_POST = require("./fb_listen_post");

function findAction(actionId, areaId, userId) {
    if (actionId === "facebook_action_post") {
        return new FB_L_POST(areaId, userId);
    }
    return new Action(areaId, userId);
}

module.exports.findAction = findAction;