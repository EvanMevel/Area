
const util = require("util");

function callbackStrategy(server, service, refreshToken, callback) {
    const strategy = server.passport._strategy(service);
    const params = {
        grant_type: "refresh_token"
    }
    strategy._oauth2.getOAuthAccessToken(refreshToken, params, callback);
}

const strategyGetToken = util.promisify((server, service, refreshToken, cb) => callbackStrategy(
    server,
    service,
    refreshToken,
    (err, ...results) => cb(err, results)
))

async function getAccessToken(server, service, refreshToken) {
    const [access_token, refresh_token, expires_in, results] = await strategyGetToken(server, service, refreshToken);
    return access_token;
}

module.exports.getAccessToken = getAccessToken;