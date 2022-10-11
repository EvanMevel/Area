
const ARList = require("../ARList");
const Reaction = require("./reaction");
const FB_POST = require("./fb_post");
const DEEZER_LIKE = require('./deezer_reaction_like');

class ReactionList extends ARList {

    constructor() {
        super("reactions", Reaction);
        this.add(FB_POST, "facebook_reaction_post", "Facebook Post", "Post a facebook post", "facebook");
        this.add(DEEZER_LIKE, "deezer_reaction_like", "Deezer Like", "Likes the track on Deezer", "Deezer");
    }
}

module.exports = ReactionList;