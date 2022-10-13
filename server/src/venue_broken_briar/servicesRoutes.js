
const spot = require("./spotifyService");
const deez = require("./deezerService");

function callLogin(server, connect) {
    return function (req, res) {
        let userId = req.query.userId;
        if (userId == null) {
            res.status(400).send({
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

    registerRoute(login, callback, "/spotify", server, spot);
    registerRoute(login, callback, "/deezer", server, deez);

    app.use("/api/services/login", login)
    app.use("/api/services/callback", callback)

    login.stack.forEach(function(r){
        if (r.route && r.route.path){
            console.log(r.route.path)
        }
    })
}

module.exports = registerServicesRoutes;