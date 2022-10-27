
const AR = require("../arCommons/ar");

class Reaction extends AR {
    accepts;

    constructor(areaId, userId, accepts) {
        super(areaId, userId);
        this.accepts = accepts;
    }

    async ingest(event, server) {
    }
}

module.exports = Reaction;