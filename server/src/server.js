const express = require('express');
const swaggerUi = require("swagger-ui-express");
const Base = require("./base/base");
const Workers = require("./workers");
const endpoints = require("./endpoints/endpoints")
const login = require("./login");
const register = require("./register");
const tokens = require("./token");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

let httpServer = null;

let server = {
    base: new Base(),
    workers: new Workers()
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
    //await workers.tickAll();
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

router.post("/login", callBase(login));

router.post("/register", callBase(register));

// API endpoints
endpoints(app, server);

httpServer = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});