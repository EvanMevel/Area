
const ActionReaction = require("./actionReaction");

class Workers {

    AREAS = {};

    loadAREA(areaO) {
        this.AREAS[areaO.id] = new ActionReaction(areaO.id, areaO.userId, areaO.actionId, areaO.reactionId);
    }

    async loadAll(areaBase) {

        await ActionReaction.registerAREA(areaBase);

        let ARS = await areaBase.area.getAll();
        for (let i = 0; i < ARS.length; i++) {
            await this.loadAREA(ARS[i]);
        }
    }

    async tickAll() {
        const start = Date.now();
        for (let [id, v] in this.AREAS) {
            let aa = this.AREAS[id];
            await aa.tick();
        }
        const elapsed = Date.now() - start;
        const waiting = Math.max(20000 - elapsed, 10000);
        setTimeout(this.tickAll, waiting);
    }

    removeAREA(id) {
        delete this.AREAS[id];
    }
}

module.exports = Workers;