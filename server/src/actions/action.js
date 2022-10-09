
class Action {
    areaId;
    userId;

    constructor(areaId, userId) {
        this.areaId = areaId;
        this.userId = userId;
    }

    async events(areabase) {
        return [];
    }
}

module.exports = Action;