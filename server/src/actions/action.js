
class Action {
    areaId;
    userId;

    constructor(areaId, userId) {
        this.areaId = areaId;
        this.userId = userId;
    }

    async events(areabase) {
        throw new Error("Method should be implemented");
    }
}

module.exports = Action;