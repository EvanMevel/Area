const Action = require('./action')

class OAuthAction extends Action {
    service;
    constructor(areaId, userId, service) {
        super(areaId, userId);
        this.service = service;
    }

    async oAuthEvent(server, token) {

    }
    async events(server) {
        const token = await server.base.accounts.getToken(this.userId, this.service);
        return this.oAuthEvent(server, token[0].token);
    }
}

module.exports = OAuthAction;