const before = Date.now();

const express = require('express');
const swaggerUi = require("swagger-ui-express");
const got = require('got');
const Base = require("./base/base");
const Workers = require("./workers");
const endpoints = require("./endpoints/endpoints");

console.log("Loaded dependencies in " + (Math.round((Date.now() - before) / 100) / 10) + "s")

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

let httpServer = null;

let server = {
    base: new Base(),
    workers: new Workers(),
    request: got
}

async function closeGracefully() {
    server.base.stop();
    if (httpServer != null) {
        console.log("Stopping server...");
        httpServer.close();
    }
    process.exit(0);
}

process.on('SIGTERM', closeGracefully);

server.base.connect().then(async () => {
    await server.workers.loadAll(server.base);
    await server.workers.tickAll(server);
});

// App
const app = express();
app.use(express.json());

// Swagger
const swaggerDocument = require("./docs/swagger.js");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", function (req, res) {
    res.redirect("/api-docs");
});

// API endpoints
endpoints(app, server);

httpServer = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});