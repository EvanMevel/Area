
const TokenEndpoint = require("./tokenEndpoint");

async function checkExists(basePoint, name, field, res) {
    const resp = await basePoint.exists(name);
    if (resp.length !== 1) {
        res.status(400).json({
            "message": "No " + field + " with such name"
        });
        return false;
    }
    return true;
}

class List extends TokenEndpoint {

    async authCalled(req, res, server, id) {
        let userAREA = await server.base.area.getUser(id);
        res.json(userAREA);
    }
}

class Delete extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        if (!this.checkFieldExist(res, req.query, "id")) {
            return;
        }
        const resp = await server.base.area.delete(req.query.id, userId);
        if (resp.affectedRows === 1) {
            server.workers.removeAREA(req.query.id);
            this.message(res, "Deleted AREA with success", 200);
        } else {
            this.message(res, "Already deleted or dont exist", 200);
        }
    }
}

class Create extends TokenEndpoint {

    async authCalled(req, res, server, id) {
        if (!this.checkFieldsExist(res, req.body, ["actionId", "reactionId"])) {
            return;
        }
        if (!(await checkExists(server.base.actions, req.body.actionId, "action", res))) {
            return
        }
        if (!(await checkExists(server.base.reactions, req.body.reactionId, "reaction", res))) {
            return
        }
        const resp = await server.base.area.create(id, req.body.actionId, req.body.reactionId);

        if (resp.affectedRows === 1) {
            await server.workers.loadAREA({
                id: resp.insertId,
                userId: id,
                actionId: req.body.actionId,
                reactionId: req.body.reactionId
            });

            res.status(201)
                .json(
                    {
                        "message": "Created AREA with success",
                        "areaId": resp.insertId
                    });
        } else {
            this.message(res, "Internal Error", 500);
        }
    }
}

class Modify extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        if (!this.checkFieldExist(res, req.body, "id")) {
            return;
        }
        if (req.body.actionId == null && req.body.reactionId == null) {
            this.message(res, "No actionId or reactionId specified!", 400);
            return;
        }
        if (req.body.actionId) {
            if (!(await checkExists(server.base.actions, req.body.actionId, "action", res))) {
                return
            }
        }
        if (req.body.reactionId) {
            if (!(await checkExists(server.base.reactions, req.body.reactionId, "reaction", res))) {
                return
            }
        }
        const hasPerm = await server.base.area.hasPermission(req.body.id, userId);
        if (hasPerm.length === 0) {
            this.message(res, "No AREA with this id", 400);
            return;
        }
        const resp = await server.base.area.editActionReaction(req.body);
        server.workers.reloadAREA(req.body);
        if (resp.affectedRows === 1) {
            res.json({
                "message": "Updated AREA with success",
                "areaId": req.body.id
            });
        } else {
            console.log(JSON.stringify(resp));
            res.json({
                "message": "Nothing updated",
                "areaId": req.body.id
            });
        }
    }
}

module.exports.list = new List();

module.exports.delete = new Delete();

module.exports.create = new Create();

module.exports.modify = new Modify();