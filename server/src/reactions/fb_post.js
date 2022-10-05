
const Reaction = require("./reaction");

class FB_POST extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events() {
        console.log("TICK FB POST " + this.id + " > " + this.userId)
    }
}

module.exports = FB_POST;