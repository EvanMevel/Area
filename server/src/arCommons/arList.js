
class ArList {
    list = {};
    table;
    baseClass;

    constructor(table, baseClass) {
        this.table = table;
        this.baseClass = baseClass;
    }

    add(ar) {
        const desc = ar.description;
        this.list[desc.name] = {
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

    find(id, areaId, user) {
        const ar = this.list[id];
        let res;
        if (ar == null) {
            res = this.baseClass;
        } else {
            res = ar.ar;
        }
        return new res(areaId, user);
    }

    async registerAR(server, desc) {
    }

    async register(server) {
        for (let id in this.list) {
            let ar = this.list[id];
            await this.registerAR(server, ar.description);
        }
    }

    stop(server) {

    }

}

module.exports = ArList;