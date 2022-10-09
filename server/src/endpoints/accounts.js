
const TokenEndpoint = require("./tokenEndpoint");

class List extends TokenEndpoint {

    async authCalled(req, res, server, id) {
        let accounts = await server.base.accounts.getUser(id);
        res.json(accounts);
    }
}

class Delete extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        if (!this.checkFieldExist(res, req.query, "service")) {
            return;
        }
        const resp = await server.base.accounts.delete(userId, req.query.service);
        if (resp.affectedRows === 1) {
            this.message(res, "Deleted account with success", 200);
        } else {
            this.message(res, "Already deleted or dont exist", 200);
        }
    }
}

class Create extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        if (!this.checkFieldsExist(res, req.body, ["service", "token"])) {
            return;
        }
        const resp = await server.base.accounts.getToken(userId, req.body.service);
        if (resp.length !== 0) {
            this.message(res, "Account with this service already exists", 400);
            return;
        }
        const create = await server.base.accounts.create(userId, req.body.service, req.body.token);

        if (create.affectedRows === 1) {
            this.message(res, "Created account with success", 201);
        } else {
            this.message(res, "Internal Error", 500);
        }
    }
}

module.exports.list = new List();

module.exports.delete = new Delete();

module.exports.create = new Create();