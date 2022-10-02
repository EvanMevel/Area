'use strict';

const express = require('express');
const AreaBase = require("./areabase");
const swaggerUi = require("swagger-ui-express");

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

areaBase.connect().then(() => {
    areaBase.createTables();
});

async function handleRequest(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("Received from the ip " + ip);

    const arr = await areaBase.getTest();
    res.send(arr);
}

// App
const app = express();
app.get('/api/test', handleRequest);

const swaggerDocument = require("./docs/swagger.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
