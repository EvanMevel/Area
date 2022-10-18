
const ArDescription = require("../arDescription");

class ReactionDescription extends ArDescription {
    accepts;

    constructor(id, name, description, service, accepts) {
        super(id, name, description, service);
        this.accepts = accepts;
    }
}

module.exports = ReactionDescription;