const express = require("express");
const about = require("./about");
const area = require("./area");
const me = require("./me");
const reactions = require("./reactions");
const actions = require("./actions");
const registerFilesRoutes = require("./files");
const BadRequest = require("./badRequest");
const strategies = require("./strategies/strategies");
const accounts = require("./accounts");

function call(server, endpoint) {
    return async function (req, res)  {
        try {
            await endpoint.called(req, res, server);
        } catch (e) {
            if (e instanceof BadRequest) {
                res.status(400).json({
                    message: e.message
                });
                return;
            } else if (e instanceof server.request.HTTPError) {
                console.error(e);
                console.error(JSON.stringify(e.response.body));
                res.status(500).send("Internal server error");
            }
            console.error(e);
            res.status(500).send("Internal server error");
        }
    }
}

function registerRoutes(app, server) {

    strategies.registerAll(app, express, server);

    server.passport = strategies.passport;

    app.get("/about.json", call(server, about));

    const api = express.Router();

    api.get("/me", call(server, me));

    api.get("/area_list", call(server, area.list));

    api.route("/area")
        .post(call(server, area.create))
        .put(call(server, area.modify))
        .delete(call(server, area.delete));

    api.get("/actions", call(server, actions));

    api.get("/reactions", call(server, reactions));

    api.get("/accounts", call(server, accounts.list));

    app.use("/api", strategies.jwt, api);

    registerFilesRoutes(app, express);
}

module.exports = registerRoutes;