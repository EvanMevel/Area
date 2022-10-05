

class Reaction {
    id;
    userId;

    async ingest(event) {
        throw new Error("Method should be implemented");
    }
}

module.exports = Reaction;