'use strict';

const express = require('express');
const swaggerUi = require("swagger-ui-express");
const AreaBase = require("./areabase");
const about = require("./about");
const workers = require("./workers");
const action_reaction = require("./area");
const login = require("./login");
const register = require("./register");
const tokens = require("./token");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

let server = null;
let areaBase = new AreaBase();

async function closeGracefully() {
    areaBase.stop();
    if (server != null) {
        console.log("Stopping server...");
        server.close();
    }
    process.exit(0);
}

process.on('SIGTERM', closeGracefully);

areaBase.connect().then(async () => {
    await areaBase.createTables();
    await workers.loadAll(areaBase);
    //await workers.tickAll();
});

// App
const app = express();

app.use(express.json());

const router = express.Router();

// Swagger
const swaggerDocument = require("./docs/swagger.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Api routes

function callBase(func) {
    return function (req, res)  {
        func(req, res, areaBase, workers, tokens);
    }
}

app.use("/about.json", callBase(about));

router.get("/area_list", callBase(action_reaction.get));

router.post("/area", callBase(action_reaction.post));

router.put("/area", callBase(action_reaction.put));

router.delete("/area", callBase(action_reaction.del));

router.post("/login", callBase(login));

router.post("/register", callBase(register));

app.use("/api", router);

app.use("/", function (req, res) {
   res.redirect("/api-docs");
});

server = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});