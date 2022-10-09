
const Reaction = require("./reaction");

class FB_POST extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, areabase) {
        console.log("TICK FB POST " + this.areaId + " > " + this.userId);
        console.log("Event is " + event);
    }

}

module.exports = FB_POST;