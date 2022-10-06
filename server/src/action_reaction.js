
function errorMessage(res, msg) {
    res.status(400);
    res.send({
        "message": msg
    });
}

function checkFieldExist(res, area, field) {
    if (area[field] == null) {
        errorMessage(res, "No " + field + " specified!");
        return false;
    }
    return true;
}

function parseResp(req) {
    let resp = {};

    if (req.body.id != null) {
        resp["id"] = req.body.id;
    }
    if (req.body.userId != null) {
        resp["userId"] = req.body.userId;
    }
    if (req.body.actionId != null) {
        resp["actionId"] = req.body.actionId;
    }
    if (req.body.reactionId != null) {
        resp["reactionId"] = req.body.reactionId;
    }
    return resp;
}

async function put(areabase, workers, req, res) {
    const area = parseResp(req, res);
    if (!checkFieldExist(res, area, "id")) {
        return;
    }
    if (area["actionId"] == null && area["reactionId"]) {
        errorMessage(res, "No actionId or reactionId specified!");
        return;
    }
    const resp = await areabase.editActionReaction(area);
    workers.removeAREA(area.id);
    workers.loadAREA(area);
    if (resp.affectedRows === 1) {
        res.send({
            "message": "Updated AREA with success"
        });
    }
}

async function post(areabase, workers, req, res) {
    const area = parseResp(req, res);
    if (!checkFieldExist(res, area, "userId")) {
        return;
    }
    if (!checkFieldExist(res, area, "actionId")) {
        return;
    }
    if (!checkFieldExist(res, area, "reactionId")) {
        return;
    }
    const resp = await areabase.createActionReaction(area);
    await workers.loadAREA(area);
    if (resp.affectedRows === 1) {
        res.status(201);
        res.send({
            "message": "Created AREA with success",
            "insertId": resp.insertId
        });
    }
}

async function del(areabase, workers, req, res) {
    const id = req.query.id || null;

    if (id == null) {
        errorMessage(res, "No id specified!");
        return;
    }
    const resp = await areabase.removeAREA(id);
    if (resp.affectedRows === 1) {
        workers.removeAREA(id);
        res.status(200);
        res.send({
            "message": "Deleted AREA with success"
        });
    } else {
        res.status(200);
        res.send({
            "message": "Already deleted"
        });
    }
}

async function get(areabase, req, res) {
    const userId = req.query.userId || null;

    if (userId == null) {
        errorMessage(res, "No userId specified!");
        return;
    }
    let userAREA = await areabase.getUserActionReactions(userId);
    userAREA.forEach(function (area) {
        delete area["userId"];
    });
    res.send(userAREA);
}

module.exports.get = get;

module.exports.del = del;

module.exports.post = post;

module.exports.put = put;