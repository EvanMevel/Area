
const spot = require("./spotifyService");

function callLogin(server, connect) {
    return function (req, res) {
        let userId = req.query.userId;
        if (userId == null) {
            res.code(400).send({
                message: "Add userId to request"
            })
        }
        connect.loginRedirect(userId, server, res);
    }
}

function callCallback(server, connect) {
    return function (req, res) {
        connect.callback(req, res, server)
    }
}

function registerRoute(login, callback, name, server, connect)
{
    login.get(name, callLogin(server, connect))
    callback.get(name, callCallback(server, connect))
}

function registerServicesRoutes(app, express, server)
{
    const login = express.Router();
    const callback = express.Router();

    registerRoute(login, callback, spot);

    app.use("services/login", login)
    app.use("services/callback", callback)
}

module.exports = registerServicesRoutes;