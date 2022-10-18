const httpSrv = require("./httpServer");

let server = {}

async function closeGracefully() {
    if (server.base != null) {
        await server.base.stop();
    }
    if (server.areas != null) {
        server.areas.stop();
    }
    await httpSrv.stop();
    process.exit(0);
}

process.on('SIGTERM', closeGracefully);

async function loadBase() {
    const Base = require("./base/base");
    server.base = new Base();

    return server.base.connect();
}

async function loadBaseAREAS() {
    const AREAList = require("./areaList");
    server.areas = new AREAList();

    await server.areas.loadAll();
}

async function loadWorkers() {
    await server.areas.loadBase(server.base);
    await server.areas.tickAll(server);
}

async function loadTokens() {
    server.tokens = await require("./token");
    console.log("[TOKENS] Loaded tokens");
}

async function loadGot() {
    server.request = require('got');
    console.log("[GOT] Loaded got");
}

async function loadAREALogic() {
    await Promise.all([
        loadBaseAREAS(),
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
        loadAREALogic()
    ]).then(() => {
        console.log("----- Loaded all in " + (Math.round((Date.now() - before) / 100) / 10) + "s -----");
    });
}

loadAll();