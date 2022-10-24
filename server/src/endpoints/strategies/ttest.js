
const util = require('util');

function callbackStrategy(server, refreshToken, callback) {
    const strategy = server.passport._strategy("spotify");
    const params = {
        grant_type: "refresh_token"
    }
    strategy._oauth2.getOAuthAccessToken(refreshToken, params, callback);
}

let strategyGetToken = util.promisify((server, refreshToken, cb) => callbackStrategy(
    server,
    refreshToken,
    (err, ...results) => cb(err, results)
))

module.exports = async function (req, res, server) {
    const [access_token, refresh_token, expires_in, results] = await strategyGetToken(server, "AQDvf_SwHDdiW_-YufwL9-q7gW2ygUGcvIP5KAmtmi0MChR7LPO9BFmN4bZhMHQHJqnZBoXSJQxhmHcvc61jMyxrZjpV8gaIqVH1pFUG-_KkZhcMcG9n2lYmTn0ruXjpNzU");

    console.log(JSON.stringify(access_token));
    console.log(JSON.stringify(refresh_token));
    console.log(JSON.stringify(expires_in));
    console.log(JSON.stringify(results));
    res.send("EHAUIBEZJAEBHJAZLE");
}