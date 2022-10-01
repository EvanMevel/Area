'use strict';

const express = require('express');
const AreaBase = require("./areabase")

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

let server = null;
let areaBase = new AreaBase();

async function closeGracefully() {
    console.log("Stopping server...");
    areaBase.stop();
    if (server != null) {
        server.close();
    }
}

process.on('SIGTERM', closeGracefully);
process.on('SIGINT', closeGracefully);

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
app.get('/', handleRequest);

server = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
