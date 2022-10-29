
const ActionReaction = require("./actionReaction");

class AREAList {

    AREAS = {};

    loadAREA(id, userId, actionId, reactionId) {
        this.AREAS[id] = new ActionReaction(id, userId, actionId, reactionId);
    }

    removeAREA(id) {
        delete this.AREAS[id];
    }

    reloadAREA(areaO) {
        let area = this.AREAS[areaO.id];
        let actionId = areaO.actionId || area.actionId;
        let reactionId = areaO.reactionId || area.reactionId;
        this.removeAREA(areaO.id);
        this.loadAREA(areaO.id, areaO.userId, actionId, reactionId);
    }

    async loadAll() {
        return ActionReaction.loadAll();
    }

    async loadBase(server) {

        await ActionReaction.registerAREA(server);

        let areas = await server.base.area.query("SELECT * FROM ActionReactions");
        for (let i = 0; i < areas.length; i++) {
            const area = areas[i];
            await this.loadAREA(area.id, area.userId, area.actionName, area.reactionName);
        }
    }

    async tickAll(server) {
        const start = Date.now();
        for (let id in this.AREAS) {
            let aa = this.AREAS[id];
            aa.tick(server);
        }
        const elapsed = Date.now() - start;
        const waiting = Math.max(20000 - elapsed, 10000);
        setTimeout(function () {
            server.areas.tickAll(server);
        }, waiting);
    }

    stop() {
        ActionReaction.stop();
    }


    getCompatibleReactions(actionId) {
        return ActionReaction.getCompatibleReactions(actionId);
    }

}

module.exports = AREAList;