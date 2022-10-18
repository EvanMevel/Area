const express = require("express");
const about = require("./about");
const area = require("./area");
const login = require("./login");
const register = require("./register");
const accounts = require("./accounts");
const registerServicesRoutes = require("../connect/servicesRoutes")
const registerFilesRoutes = require("./files");
const BadRequest = require("./badRequest");

function call(server, endpoint) {
    return async function (req, res)  {
        try {
            await endpoint.called(req, res, server);
        } catch (e) {
            if (e instanceof BadRequest) {
                res.status(400).json(
                    {
                        "message": e.message
                    }
                );
                return;
            }
            console.error(e);
            res.status(500).send("Internal server error");
        }
    }
}

function registerRoutes(app, server) {

    app.get("/about.json", call(server, about));

    const router = express.Router();

    router.get("/area_list", call(server, area.list));

    router.post("/area", call(server, area.create));

    router.put("/area", call(server, area.modify));

    router.delete("/area", call(server, area.delete));

    router.post("/login", call(server, login));

    router.post("/register", call(server, register));

    router.get("/accounts", call(server, accounts.list));

    router.delete("/accounts", call(server, accounts.delete));

    router.post("/accounts", call(server, accounts.create));

    app.use("/api", router);

    registerServicesRoutes(app, express, server);

    registerFilesRoutes(app, express);
}

module.exports = registerRoutes;