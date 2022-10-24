
const TokenEndpoint = require("./tokenEndpoint");

class Reactions extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        this.checkFieldExist(req.query, "action");

        const action = req.query.action;

        let reactions = server.areas.getCompatibleReactions(action);

        let accounts = await server.base.accounts.getServices(userId);

        reactions = reactions.filter((reaction) => {
            if (!server.services.isOauth(reaction.service)) {
                return true;
            }
            for (let i = 0; i < accounts.length; i++) {
                const service = accounts[i].service;
                if (service === reaction.service) {
                    return true;
                }
            }
            return false;
        })
        reactions.forEach((reaction) => {
            delete reaction["accepts"];
        });
        res.json(reactions);
    }
}

module.exports = new Reactions();