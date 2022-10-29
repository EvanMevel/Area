
const TokenEndpoint = require("./tokenEndpoint");
const BadRequest = require("./badRequest");

class List extends TokenEndpoint {

    async authCalled(req, res, server, user) {
        const areas = await server.base.area.query("SELECT * FROM ActionReactions WHERE ActionReactions.userId = " + user.id);
        res.json(areas);
    }
}

class Delete extends TokenEndpoint {

    async authCalled(req, res, server, user) {
        this.checkFieldExist(req.query, "id")

        const area = await server.base.area.findOneBy({id: req.query.id, user: user});

        if (area == null) {
            this.message(res, "Already deleted or dont exist", 200);
        } else {
            const actionData = await server.base.actionData.findOneBy({id: area.id});
            if (actionData != null) {
                await server.base.actionData.remove(actionData);
            }
            await server.base.area.remove(area);
            server.areas.removeAREA(area.id);
            this.message(res, "Deleted AREA with success", 200);
        }
    }
}

class Create extends TokenEndpoint {

    async authCalled(req, res, server, user) {
        this.checkFieldsExist(req.body, ["actionId", "reactionId"]);
        const {actionId, reactionId} = req.body;
        if (!(await server.base.actions.countBy({name: actionId}))) {
            throw new BadRequest("No Action with such name \"" + actionId + "\"");
        }
        if (!(await server.base.reactions.countBy({name: reactionId}))) {
            throw new BadRequest("No Reaction with such name \"" + reactionId + "\"");
        }

        const resp = await server.base.area.save({user: user, action: {name: actionId}, reaction: {name: reactionId}});
        if (resp.id == null) {
            throw new Error("AREA creation sql should return a response, got an empty response instead!")
        } else {
            await server.areas.loadAREA(resp.id, user.id, actionId, reactionId);

            res.status(201).json(
                {
                    "message": "Created AREA with success",
                    "areaId": resp.insertId
                }
            );
        }
    }
}

class Modify extends TokenEndpoint {

    async authCalled(req, res, server, user) {
        this.checkFieldExist(req.body, "id");
        const {actionId, reactionId} = req.body;
        const area = await server.base.area.findOneBy({id: req.body.id, user: user});

        if (area == null) {
            throw new BadRequest("No AREA with this id");
        }
        if (!actionId && !reactionId) {
            throw new BadRequest("No actionId or reactionId specified!")
        }
        if (actionId &&!(await server.base.actions.countBy({name: actionId}))) {
            throw new BadRequest("No Action with such name \"" + actionId + "\"");
        }
        if (reactionId && !(await server.base.reactions.countBy({name: reactionId}))) {
            throw new BadRequest("No Reaction with such name \"" + reactionId + "\"");
        }
        res.json({
            message: "TODO, this is not yet implemented, only pre-conditions are checked"
        });
    }
}

module.exports.list = new List();

module.exports.delete = new Delete();

module.exports.create = new Create();

module.exports.modify = new Modify();