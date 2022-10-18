
class ARList {
    list = {};
    table;
    baseClass;

    constructor(table, baseClass) {
        this.table = table;
        this.baseClass = baseClass;
    }

    add(ar) {
        const desc = ar.description;
        this.list[desc.id] = {
            ar: ar,
            description: desc
        };
    }

    getDescription(id) {
        const ar = this.list[id];
        if (ar == null) {
            return null;
        }
        return ar.description;
    }

    find(id, areaId, userId) {
        const ar = this.list[id];
        let res;
        if (ar == null) {
            res = this.baseClass;
        } else {
            res = ar.ar;
        }
        return new res(areaId, userId);
    }

    async registerAR(areabase, desc) {
        await areabase[this.table].create(desc.id, desc.displayName, desc.description, desc.service);
    }

    async register(areabase) {
        for (let id in this.list) {
            let ar = this.list[id];
            await this.registerAR(areabase, ar.description);
        }
    }

    stop(server) {

    }

}

module.exports = ARList;