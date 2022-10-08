
const ActionReaction = require("./actionReaction");

class Workers {

    AREAS = {};

    loadAREA(areaO) {
        this.AREAS[areaO.id] = new ActionReaction(areaO.id, areaO.userId, areaO.actionId, areaO.reactionId);
    }

    removeAREA(id) {
        delete this.AREAS[id];
    }

    reloadAREA(areaO) {
        let area = this.AREAS[areaO.id];
        let actionId = areaO.actionId || area.actionId;
        let reactionId = areaO.reactionId || area.reactionId;
        this.removeAREA(areaO.id);
        this.loadAREA({
            id: areaO.id,
            userId: areaO.userId,
            actionId: actionId,
            reactionId: reactionId
        });
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
}

module.exports = Workers;