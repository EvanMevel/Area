

class Reaction {
    areaId;
    userId;

    constructor(areaId, userId) {
        this.areaId = areaId;
        this.userId = userId;
    }

    async ingest(event, areabase) {
    }
}

module.exports = Reaction;