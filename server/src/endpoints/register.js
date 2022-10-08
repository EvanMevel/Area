
const Endpoint = require("./endpoint");

class Register extends Endpoint {

    alreadyExist(exists, res, fieldName) {
        if (exists.length !== 0) {
            this.message(res, "User with this " + fieldName + " already exists!", 400);
            return true;
        }
        return false;
    }

    async called(req, res, server) {
        this.checkFieldsExist(res, req.body, ["name", "email", "password"]);

        if (this.alreadyExist(
            await server.base.users.nameAlreadyExist(req.body.name),
            res, "name")) {
            return
        }
        if (this.alreadyExist(
            await server.base.users.emailAlreadyExist(req.body.email),
            res, "email")) {
            return
        }
        let resp = await server.base.users.register(req.body.name, req.body.email, req.body.password);
        if (resp.affectedRows !== 1) {
            this.message(res, "Server error!", 500);
            return;
        }
        const token = server.tokens.generate(resp.insertId);
        res.json({
            token: token
        });
    }
}

module.exports = new Register();