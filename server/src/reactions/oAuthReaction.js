const Reaction = require('./reaction')
const util = require("util");

class OAuthReaction extends Reaction {

    service;

    constructor(areaId, userId, service) {
        super(areaId, userId);
        this.service = service;
    }

    async oAuthIngest(event, server, account) {

    }

    callbackStrategy(server, refreshToken, callback) {
        const strategy = server.passport._strategy(this.service);
        const params = {
            grant_type: "refresh_token"
        }
        strategy._oauth2.getOAuthAccessToken(refreshToken, params, callback);
    }

    strategyGetToken = util.promisify((server, refreshToken, cb) => this.callbackStrategy(
        server,
        refreshToken,
        (err, ...results) => cb(err, results)
    ))

    async getAccessToken(server, refresh_token) {
        const [access_token, rerefresh_token, expires_in, results] = await this.strategyGetToken(server, refresh_token);
        return access_token;
    }

    async ingest(event, server) {
        const account = await server.base.accounts.getToken(this.userId, this.service);
        return this.oAuthIngest(event, server, account[0]);
    }
}

module.exports = OAuthReaction;