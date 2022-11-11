
const TokenEndpoint = require("./tokenEndpoint");
const BadRequest = require("./badRequest");

class Reactions extends TokenEndpoint {

    async authCalled(req, res, server, user) {
        this.checkFieldExist(req.query, "action");

        const action = req.query.action;
        if (!(await server.base.actions.countBy({name: action}))) {
            throw new BadRequest("No Action with such name \"" + action + "\"");
        }

        let reactions = server.areas.getCompatibleReactions(action);

        if (reactions.length > 0) {
            let accounts = await server.base.accounts.query("SELECT * FROM Accounts WHERE Accounts.userId = " + user.id);

            reactions = reactions.filter((reaction) => {
                if (!server.services.isOauth(reaction.serviceName)) {
                    return true;
                }
                for (let i = 0; i < accounts.length; i++) {
                    const service = accounts[i].serviceName;
                    if (service === reaction.serviceName) {
                        return true;
                    }
                }
                return false;
            })
        }
        reactions.forEach((reaction) => {
            delete reaction["accepts"];
        });
        res.json(reactions);
    }
}

module.exports = new Reactions();