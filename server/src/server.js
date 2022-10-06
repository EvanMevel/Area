'use strict';

const express = require('express');
const swaggerUi = require("swagger-ui-express");
const AreaBase = require("./areabase");
const about = require("./about");
const workers = require("./workers");
const action_reaction = require("./action_reaction");

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

const swaggerDocument = require("./docs/swagger.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/about.json", function (req, res) {
    about(areaBase, req, res);
});

const router = express.Router();

router.get("/action-reaction-list", function (req, res) {
    action_reaction.get(areaBase, req, res);
});

router.post("/action_reaction", function (req, res) {
    action_reaction.post(areaBase, workers, req, res);
});

router.put("/action_reaction", function (req, res) {
    action_reaction.put(areaBase, workers, req, res);
});

router.delete("/action_reaction", function (req, res) {
    action_reaction.del(areaBase, workers, req, res);
});

app.use("/api", router);

app.use("/", function (req, res) {
   res.redirect("/api-docs");
});

server = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});