
class ARList {
    list = {};
    table;
    baseClass;

    constructor(table, baseClass) {
        this.table = table;
        this.baseClass = baseClass;
    }

    add(ar, id, name, desc, service) {
        this.list[id] = {
            ar: ar,
            displayName: name,
            desc: desc,
            service: service
        };
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

    async register(areabase) {
        for (let id in this.list) {
            let ar = this.list[id];
            await areabase[this.table].create(id, ar.displayName, ar.desc, ar.service);
        }
    }

}

module.exports = ARList;