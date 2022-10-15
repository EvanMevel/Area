
const PORT = 8080;
const HOST = '0.0.0.0';

let httpServer = null;

async function load() {
    const express = await require('express');

    const app = await express();
    app.use(express.json());
    return app;
}

async function start(app) {
    httpServer = await app.listen(PORT, HOST);
}

async function stop() {
    if (httpServer != null) {
        console.log("[EXPRESS] Stopping server...");
        await httpServer.close();
    }
}

function loadSwagger(app) {
    const swaggerUi = require("swagger-ui-express");
    const swaggerDocument = require("./docs/swagger.js");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get("/", function (req, res) {
        res.redirect("/api-docs");
    });
}

async function loadAll(server) {

    console.log("[EXPRESS] Starting server...")

    const app = await load();

    loadSwagger(app);

    const endpoints = require("./endpoints/endpoints");

    endpoints(app, server);

    await start(app);

    console.log("[EXPRESS] Loaded server! ")

    return app;
}

module.exports.load = load;

module.exports.start = start;

module.exports.stop = stop;

module.exports.loadSwagger = loadSwagger;

module.exports.loadAll = loadAll;