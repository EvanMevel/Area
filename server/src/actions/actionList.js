
const ARList = require("../ARList");
const Action = require("./action");
const FB_L_POST = require("./fb_listen_post");

class ActionList extends ARList {

    constructor() {
        super("actions", Action);
        this.add(FB_L_POST, "facebook_action_post", "Facebook Listen Post", "Listen to a facebook post", "facebook");
    }
}

module.exports = ActionList;