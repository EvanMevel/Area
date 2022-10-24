
const Endpoint = require("./endpoint");
const BadRequest = require("./badRequest");

class TokenEndpoint extends Endpoint {

    async authCalled(req, res, server, userId) {

    }

    async called(req, res, server) {
        const userId = req.user;

        if (userId == null) {
            throw new BadRequest("No Authorization header provided!");
        }
        return this.authCalled(req, res, server, userId);
    }
}

module.exports = TokenEndpoint;