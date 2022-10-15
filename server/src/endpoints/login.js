
const Endpoint = require("./endpoint");
const BadRequest = require("./badRequest");

class Login extends Endpoint {

    async called(req, res, server) {
        this.checkFieldsExist(req.body, ["name", "password"]);

        let resp = await server.base.users.login(req.body.name);
        if (!resp.length || resp[0].password !== req.body.password) {
            throw new BadRequest("Invalid name or password!");
        }
        const id = resp[0].id;
        const token = server.tokens.generate(id);
        res.json(
            {
                "token": token
            }
        );
    }
}

module.exports = new Login();