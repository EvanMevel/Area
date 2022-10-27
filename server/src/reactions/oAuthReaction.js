const Reaction = require('./reaction')
const arPassport = require("../arCommons/arPassportOauth");

class OAuthReaction extends Reaction {

    service;

    constructor(areaId, userId, service) {
        super(areaId, userId);
        this.service = service;
    }

    async oAuthIngest(event, server, account) {

    }

    async getAccessToken(server, refreshToken) {
        return arPassport.getAccessToken(server, this.service, refreshToken);
    }

    async ingest(event, server) {
        const account = await server.base.accounts.findOneBy({user: {id: this.userId}, service: {name: this.service}});
        return this.oAuthIngest(event, server, account);
    }
}

module.exports = OAuthReaction;