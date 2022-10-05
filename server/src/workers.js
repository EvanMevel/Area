
const ActionReaction = require("./actionReaction");

let AREAS = {};

async function loadAREA(areaO) {
    AREAS[areaO.id] = new ActionReaction(areaO.id, areaO.userId, areaO.actionId, areaO.reactionId);
}

async function loadAll(areaBase) {
    let ARS = await areaBase.getActionReactions();
    for (let i = 0; i < ARS.length; i++) {
        await loadAREA(ARS[i]);
    }
}

async function tickAll() {
    for (const [id, area] in AREAS) {
        await area.tick();
    }
}

async function removeAREA(areaBase, id) {
    delete AREAS[id];
    await areaBase.removeAREA(id);
}

module.exports.loadAll = loadAll;

module.exports.tickAll = tickAll;

module.exports.removeAREA = removeAREA;