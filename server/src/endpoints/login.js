
const Endpoint = require("./endpoint");

class Login extends Endpoint {

    async called(req, res, server) {
        this.checkFieldsExist(res, req.body, ["name", "password"]);

        let resp = await server.base.users.login(req.body.name);
        if (!resp.length || resp[0].password !== req.body.password) {
            this.message(res, "Invalid name or password!", 400);
            return;
        }
        const id = resp[0].id;
        server.tokens.sendToken(server.base, id, res);
    }
}

module.exports = new Login();