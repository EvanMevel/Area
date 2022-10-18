const Reaction = require('./reaction')

class OAuthReaction extends Reaction {
    service;
    constructor(areaId, userId, service) {
        super(areaId, userId);
        this.service = service;
    }

    async oAuthIngest(event, server, token) {

    }

    async ingest(event, server) {
        const token = await server.base.accounts.getToken(this.userId, this.service);
        return this.oAuthIngest(event, server, token[0].token);
    }
}

module.exports = OAuthReaction;