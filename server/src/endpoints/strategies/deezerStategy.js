const DeezerStrategy = require("passport-deezer").Strategy;
const scopes = "basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history";

module.exports.Strategy = new DeezerStrategy({
    clientID: process.env.DEEZER_CLIENT_ID,
    clientSecret: process.env.DEEZER_CLIENT_SECRET,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});

module.exports.StrategyApp = new DeezerStrategy({
    clientID: process.env.DEEZER_CLIENT_ID_APP,
    clientSecret: process.env.DEEZER_CLIENT_SECRET_APP,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});