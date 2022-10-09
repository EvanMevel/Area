
const Reaction = require("./reaction");

class FB_POST extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, areabase) {
        console.log("fb post: " + event);
    }

}

module.exports = FB_POST;