
const ArDescription = require("../arCommons/arDescription");

class ActionDescription extends ArDescription {
    returns;

    constructor(id, name, description, service, returns) {
        super(id, name, description, service);
        this.returns = returns;
    }
}

module.exports = ActionDescription;