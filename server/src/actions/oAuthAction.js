const Action = require('./action')
const arPassport = require("../arCommons/arPassportOauth");

class OAuthAction extends Action {

    service;

    constructor(areaId, userId, service) {
        super(areaId, userId);
        this.service = service;
    }

    async oAuthEvent(server, account) {

    }

    async getAccessToken(server, refreshToken) {
        return arPassport.getAccessToken(server, this.service, refreshToken);
    }

    async events(server) {
        const account = await server.base.accounts.findOneBy({user: {id: this.userId}, service: {name: this.service}});
        return this.oAuthEvent(server, account);
    }
}

module.exports = OAuthAction;