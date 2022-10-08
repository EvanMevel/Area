
const ARList = require("../ARList");
const Reaction = require("./reaction");
const FB_POST = require("./fb_post");

class ReactionList extends ARList {

    constructor() {
        super("reactions", Reaction);
        this.add(FB_POST, "facebook_reaction_post", "Facebook Post", "Post a facebook post", "facebook");
    }
}

module.exports = ReactionList;