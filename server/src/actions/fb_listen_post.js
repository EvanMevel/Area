
const Action = require("./action");

class FB_L_POST extends Action {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events() {
        console.log("TICK FB " + this.id + " > " + this.userId)
    }
}

module.exports = FB_L_POST;