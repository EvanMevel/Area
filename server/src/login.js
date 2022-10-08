
function errorMessage(res, msg) {
    res.status(400);
    res.send({
        "message": msg
    });
}

async function post(req, res, areabase, workers, tokens) {
}

module.exports = post;