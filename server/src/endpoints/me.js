const TokenEndpoint = require("./tokenEndpoint");

class Me extends TokenEndpoint {

    async authCalled(req, res, server, user) {
        return res.json(user);
    }
}

module.exports = new Me();