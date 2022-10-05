'use strict';

const express = require('express');
const swaggerUi = require("swagger-ui-express");
const AreaBase = require("./areabase");
const about = require("./about");
const workers = require("./workers");

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
    await workers.tickAll();
});

// App
const app = express();

const swaggerDocument = require("./docs/swagger.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/about.json", function (req, res) {
    about(areaBase, req, res);
});

server = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});