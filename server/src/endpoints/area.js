
const Endpoint = require("./endpoint");

class List extends Endpoint {

    async called(req, res, server) {
        if (!this.checkFieldExist(res, req.query, "userId")) {
            return;
        }
        let userAREA = await server.base.area.getUser(req.query.userId);
        userAREA.forEach(function (area) {
            delete area["userId"];
        });
        res.send(userAREA);
    }
}

class Delete extends Endpoint {

    async called(req, res, server) {
        if (!this.checkFieldExist(res, req.query, "id")) {
            return;
        }
        const resp = await server.base.area.delete(req.query.id);
        if (resp.affectedRows === 1) {
            server.workers.removeAREA(req.query.id);
            this.message(res, "Deleted AREA with success", 200);
        } else {
            this.message(res, "Already deleted", 200);
        }
    }
}

class Create extends Endpoint {

    async called(req, res, server) {
        if (!this.checkFieldsExist(res, req.body, ["userId", "actionId", "reactionId"])) {
            return;
        }
        const resp = await server.base.area.create(req.body);
        await server.workers.loadAREA(req.body);
        if (resp.affectedRows === 1) {
            res.status(201);
            res.send({
                "message": "Created AREA with success",
                "insertId": resp.insertId
            });
        }
    }
}

class Modify extends Endpoint {

    //TODO this will not work if only actionId or reactionId is specified
    async called(req, res, server) {
        if (!this.checkFieldExist(res, req.body, "id")) {
            return;
        }
        if (req.body["actionId"] == null && req.body["reactionId"]) {
            this.message(res, "No actionId or reactionId specified!", 400);
            return;
        }
        const resp = await server.base.area.editActionReaction(req.body);
        server.workers.removeAREA(req.body.id);
        server.workers.loadAREA(req.body);
        if (resp.affectedRows === 1) {
            res.send({
                "message": "Updated AREA with success"
            });
        }
    }
}

module.exports.list = new List();

module.exports.delete = new Delete();

module.exports.create = new Create();

module.exports.modify = new Modify();