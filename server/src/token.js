
function rand() {
    return Math.random().toString(36).substring(2); // remove `0.`
}

function generateToken() {
    return rand() + rand(); // to make it longer
}

async function obtainToken(areabase, id) {
    await areabase.tokens.removeToken(id);
    let newToken = generateToken();
    await areabase.tokens.setToken(newToken, id, 1);
    return newToken;
}

async function sendToken(areabase, id, res) {
    const token = await obtainToken(areabase, id);
    res.send({
        "token": token
    });
}

async function getUser(areabase, token) {
    const userId = await areabase.tokens.getTokenUser(token) || null;
    if (userId == null) {
        return null;
    }
    return userId;
}

module.exports.sendToken = sendToken;

module.exports.getUser = getUser;