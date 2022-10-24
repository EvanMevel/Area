
const TokenEndpoint = require("./tokenEndpoint");
const BadRequest = require("./badRequest");

async function checkValidInDb(basePoint, name, field) {
    const resp = await basePoint.exists(name);
    if (resp.length !== 1) {
        throw new BadRequest("No " + field + " with such name");
    }
}

class List extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        let userAREA = await server.base.area.getUser(userId);
        res.json(userAREA);
    }
}

class Delete extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        this.checkFieldExist(req.query, "id")

        await server.base.actionData.delete(req.query.id);

        const resp = await server.base.area.delete(req.query.id, userId);
        if (resp.affectedRows === 1) {
            server.areas.removeAREA(req.query.id);
            this.message(res, "Deleted AREA with success", 200);
        } else {
            this.message(res, "Already deleted or dont exist", 200);
        }
    }
}

class Create extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        this.checkFieldsExist(req.body, ["actionId", "reactionId"])
        await checkValidInDb(server.base.actions, req.body.actionId, "action")
        await checkValidInDb(server.base.reactions, req.body.reactionId, "reaction")

        const resp = await server.base.area.create(userId, req.body.actionId, req.body.reactionId);

        if (resp.affectedRows === 1) {
            await server.areas.loadAREA(resp.insertId, userId, req.body.actionId, req.body.reactionId);

            res.status(201).json(
                {
                    "message": "Created AREA with success",
                    "areaId": resp.insertId
                }
            );
        } else {
            throw new Error("AREA creation sql should return a response, got an empty response instead!")
        }
    }
}

class Modify extends TokenEndpoint {

    async authCalled(req, res, server, userId) {
        this.checkFieldExist(req.body, "id")

        if (req.body.actionId == null && req.body.reactionId == null) {
            throw new BadRequest("No actionId or reactionId specified!")
        }
        if (req.body.actionId) {
            await checkValidInDb(server.base.actions, req.body.actionId, "action", res)
        }
        if (req.body.reactionId) {
            await checkValidInDb(server.base.reactions, req.body.reactionId, "reaction", res)
        }
        const hasPerm = await server.base.area.hasPermission(req.body.id, userId);
        if (hasPerm.length === 0) {
            throw new BadRequest("No AREA with this id");
        }
        const resp = await server.base.area.editActionReaction(req.body);
        server.areas.reloadAREA(req.body);
        res.json(
            {
                "message": resp.affectedRows === 1 ? "Updated AREA with success" : "Nothing updated",
                "areaId": req.body.id
            }
        );
    }
}

module.exports.list = new List();

module.exports.delete = new Delete();

module.exports.create = new Create();

module.exports.modify = new Modify();