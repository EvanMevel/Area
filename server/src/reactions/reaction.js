
class Reaction {
    areaId;
    userId;
    accepts;

    constructor(areaId, userId, accepts) {
        this.areaId = areaId;
        this.userId = userId;
        this.accepts = accepts;
    }

    async ingest(event, server) {
    }
}

module.exports = Reaction;