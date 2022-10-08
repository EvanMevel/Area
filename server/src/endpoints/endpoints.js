const express = require("express");
const about = require("./about");
const action_reaction = require("./area");
const login = require("./login");
const register = require("./register");

function call(server, endpoint) {
    return function (req, res)  {
        endpoint.called(req, res, server);
    }
}

function registerRoutes(app, server) {

    app.get("/about.json", call(server, about));

    const router = express.Router();

    router.get("/area_list", call(server, action_reaction.list));

    router.post("/area", call(server, action_reaction.create));

    router.put("/area", call(server, action_reaction.modify));

    router.delete("/area", call(server, action_reaction.delete));

    router.post("/login", call(server, login));

    router.post("/register", call(server, register));

    app.use("/api", router);
}

module.exports = registerRoutes;