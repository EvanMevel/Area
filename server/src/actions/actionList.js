
const ARList = require("../ARList");
const Action = require("./action");
const FB_L_POST = require("./fb_listen_post");
const SPOTIFY_LIKE = require("./spotify_action_like");

class ActionList extends ARList {

    constructor() {
        super("actions", Action);
        this.add(FB_L_POST, "facebook_action_post", "Facebook Listen Post", "Listen to a facebook post", "facebook");
        this.add(SPOTIFY_LIKE, "spotify_action_like", "Spotify Listen Likes", "Listen to user liking a track on spotify", "spotify");
    }
}

module.exports = ActionList;