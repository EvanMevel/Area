
const Endpoint = require("./endpoint");
const BadRequest = require("./badRequest");

class TokenEndpoint extends Endpoint {

    async authCalled(req, res, server, user) {

    }

    async called(req, res, server) {
        const userId = req.user;

        if (userId == null) {
            throw new BadRequest("No Authorization header provided!");
        }
        const user = await server.base.users.findOneBy({id: userId});
        delete user["password"];
        return this.authCalled(req, res, server, user);
    }
}

module.exports = TokenEndpoint;