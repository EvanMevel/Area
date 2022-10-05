

class Action {
    id;
    userId;

    async events() {
        throw new Error("Method should be implemented");
    }
}

module.exports = Action;