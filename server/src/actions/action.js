
const AR = require("../arCommons/ar");

class Action extends AR {

    async getDataString(server) {
        return server.actionDataUtils.getString(server, this.areaId);
    }

    async setData(server, data) {
        return server.base.actionData.save({id: this.areaId, data: data});
    }

    async events(server) {
        return [];
    }
}

module.exports = Action;