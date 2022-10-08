
function errorMessage(res, msg) {
    res.status(400);
    res.send({
        "message": msg
    });
}

async function post(req, res, areabase, workers, tokens) {
    let name = req.body.name || null;
    let password = req.body.password || null;

    if (name == null) {
        errorMessage(res, "No name provided!");
        return;
    }
    if (password == null) {
        errorMessage(res, "No password provided!");
        return;
    }
    let resp = await areabase.login(name);
    console.log(JSON.stringify(resp) + " " + resp.length + " " + (resp));
    if (!resp.length || resp[0].password !== password) {
        errorMessage(res, "Invalid name or password!");
        return;
    }
    const id = resp[0].id;
    tokens.sendToken(areabase, id, res);
}

module.exports = post;