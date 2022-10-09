
const Action = require("./action");

class FB_L_POST extends Action {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events(areabase) {
        console.log("TICK FB " + this.areaId + " > " + this.userId);
        return ["ahah"];
    }
}

module.exports = FB_L_POST;