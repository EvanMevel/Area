
function errorMessage(res, msg, status) {
    if (status == null) {
        status = 400;
    }
    res.status(status);
    res.send({
        "message": msg
    });
}

async function post(req, res, areabase, workers, tokens) {
    let name = req.body.name || null;
    let email = req.body.email || null;
    let password = req.body.password || null;

    if (name == null) {
        errorMessage(res, "No name provided!");
        return;
    }
    if (email == null) {
        errorMessage(res, "No email provided!");
        return;
    }
    if (password == null) {
        errorMessage(res, "No password provided!");
        return;
    }
    let exists = await areabase.nameAlreadyExist(name);
    console.log(JSON.stringify(exists));
    if (exists.length !== 0) {
        errorMessage(res, "User with this name already exists!");
        return;
    }
    exists = await areabase.emailAlreadyExist(email);
    console.log(JSON.stringify(exists));
    if (exists.length !== 0) {
        errorMessage(res, "User with this email already exists!");
        return;
    }
    let resp = await areabase.register(name, email, password);
    console.log(JSON.stringify(resp));
    if (resp.affectedRows !== 1) {
        errorMessage(res, "Server error!", 500);
        return;
    }
    const id = resp.insertId;
    tokens.sendToken(areabase, id, res);
}

module.exports = post;