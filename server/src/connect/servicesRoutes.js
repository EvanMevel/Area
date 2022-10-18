
const Deez = require("./deezerService");
const Nuts = require("./spotifyService");

function callLogin(server, connect) {
    return async function (req, res) {
        let userId = req.query.userId;
        if (userId == null) {
            res.status(400).send({
                message: "Add userId to request"
            })
        }
        try {
            await connect.loginRedirect(userId, server, res);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal server error");
        }
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

    registerRoute(login, callback, "/deezer", server, Deez);
    registerRoute(login, callback, "/spotify", server, Nuts);

    app.use("/api/services/login", login)
    app.use("/api/services/callback", callback)
}

module.exports = registerServicesRoutes;