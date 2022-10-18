
const Endpoint = require("./endpoint");
const BadRequest = require("./badRequest");

class Register extends Endpoint {

    alreadyExist(fieldName, exists) {
        if (exists.length !== 0) {
            throw new BadRequest("User with this " + fieldName + " already exists!");
        }
    }

    async called(req, res, server) {
        this.checkFieldsExist(req.body, ["name", "email", "password"]);

        this.alreadyExist("name",
            await server.base.users.nameAlreadyExist(req.body.name))

        this.alreadyExist("email",
            await server.base.users.emailAlreadyExist(req.body.email))

        let resp = await server.base.users.register(req.body.name, req.body.email, req.body.password);
        if (resp.affectedRows !== 1) {
            throw new Error("User registration sql should respond with a result, got an empty response instead!")
        }
        const token = server.tokens.generate(resp.insertId);
        res.json(
            {
                "token": token
            }
        );
    }
}

module.exports = new Register();