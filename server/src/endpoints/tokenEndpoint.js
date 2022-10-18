
const Endpoint = require("./endpoint");
const BadRequest = require("./badRequest");

class TokenEndpoint extends Endpoint {

    async authCalled(req, res, server, id) {

    }

    async called(req, res, server) {
        let auth = req.headers.Authorization || req.headers.authorization || null;

        if (auth == null) {
            throw new BadRequest("No Authorization header provided!");
        }
        let id = server.tokens.verify(auth.substring(7));
        if (id == null) {
            this.message(res, "Invalid token", 401);
            return;
        }
        return this.authCalled(req, res, server, id);
    }
}

module.exports = TokenEndpoint;