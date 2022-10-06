
const ActionReaction = require("./actionReaction");

let AREAS = {};

function loadAREA(areaO) {
    AREAS[areaO.id] = new ActionReaction(areaO.id, areaO.userId, areaO.actionId, areaO.reactionId);
}

async function loadAll(areaBase) {
    let ARS = await areaBase.getActionReactions();
    for (let i = 0; i < ARS.length; i++) {
        await loadAREA(ARS[i]);
    }
}

async function tickAll() {
    const start = Date.now();
    for (let [id, v] in AREAS) {
        let aa = AREAS[id];
        await aa.tick();
    }
    const elapsed = Date.now() - start;
    const waiting = Math.max(20000 - elapsed, 10000);
    setTimeout(tickAll, waiting);
}

function removeAREA(id) {
    delete AREAS[id];
}

module.exports.loadAREA = loadAREA;

module.exports.loadAll = loadAll;

module.exports.tickAll = tickAll;

module.exports.removeAREA = removeAREA;