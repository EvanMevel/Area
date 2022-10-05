
const Reaction = require("./reaction");
const FB_POST = require("./fb_post");

let reactions = {};

function addReaction(id, reac) {
    reactions[id] = reac;
}

function findReaction(reactionId, areaId, userId) {
    let reac = reactions[reactionId];
    if (reac == null) {
        reac = Reaction;
    }
    return new reac(areaId, userId);
}

addReaction("facebook_reaction_post", FB_POST);

module.exports.findReaction = findReaction;