
const Reaction = require("./reaction");
const FB_POST = require("./fb_post");

function findReaction(reactionId, areaId, userId) {
    if (reactionId === "facebook_action_post") {
        return new FB_POST(areaId, userId);
    }
    return new Reaction(areaId, userId);
}

module.exports.findReaction = findReaction;