const TokenEndpoint = require("./tokenEndpoint");

class List extends TokenEndpoint {

    async authCalled(req, res, server, user) {
        const accounts = await server.base.accounts.find({
            where: {user: user},
            loadRelationIds: true
        });
        accounts.forEach((account) => {
            delete account["user"];
            delete account["refreshToken"];
            delete account["accessToken"];
        });
        res.json(accounts);
    }
}

module.exports.list = new List();