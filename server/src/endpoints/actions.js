
const TokenEndpoint = require("./tokenEndpoint");

class Actions extends TokenEndpoint {

    async authCalled(req, res, server, user) {

        let actions = server.areas.getAllActions();

        if (actions.length > 0) {
            let accounts = await server.base.accounts.query("SELECT * FROM Accounts WHERE Accounts.userId = " + user.id);

            actions = actions.filter((action) => {
                if (!server.services.isOauth(action.serviceName)) {
                    return true;
                }
                for (let i = 0; i < accounts.length; i++) {
                    const service = accounts[i].serviceName;
                    if (service === action.serviceName) {
                        return true;
                    }
                }
                return false;
            })
        }
        actions.forEach((reaction) => {
            delete reaction["returns"];
        });
        res.json(actions);
    }
}

module.exports = new Actions();