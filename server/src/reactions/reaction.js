

class Reaction {
    areaId;
    userId;

    constructor(areaId, userId) {
        this.areaId = areaId;
        this.userId = userId;
    }

    async ingest(event) {
        throw new Error("Method should be implemented");
    }
}

module.exports = Reaction;