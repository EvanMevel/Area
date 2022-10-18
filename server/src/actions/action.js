
class Action {
    areaId;
    userId;

    constructor(areaId, userId) {
        this.areaId = areaId;
        this.userId = userId;
    }

    async events(server) {
        return [];
    }
}

module.exports = Action;