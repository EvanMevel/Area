
const httpSrv = require("./httpServer");

let server = {
}

async function closeGracefully() {
    if (server.base != null) {
        await server.base.stop();
    }
    if (server.workers != null) {
        server.workers.stop();
    }
    await httpSrv.stop();
    process.exit(0);
}

process.on('SIGTERM', closeGracefully);

async function loadBase() {
    const Base = require("./base/base");
    server.base = new Base();

    await server.base.connect();
}

async function loadBaseWorkers() {
    const Workers = require("./workers");
    server.workers = new Workers();

    await server.workers.loadAll();
}

async function loadWorkers() {
    await server.workers.loadBase(server.base);
    await server.workers.tickAll(server);
}

async function loadTokens() {
    server.tokens = await require("./token");
    console.log("[TOKENS] Loaded tokens");
}

async function loadGot() {
    server.request = require('got');
    console.log("[GOT] Loaded got");
}

async function loadWorkersLogic() {
    await Promise.all([
        loadBaseWorkers(),
        loadBase(),
        loadGot()
    ]);
    await loadWorkers();
}

async function loadAll() {
    const before = Date.now();
    Promise.all([
        loadTokens(),
        httpSrv.loadAll(server),
        loadWorkersLogic()
    ]).then(() => {
        console.log("----- Loaded all in " + (Math.round((Date.now() - before) / 100) / 10) + "s" + "-----");
    });
}

loadAll();