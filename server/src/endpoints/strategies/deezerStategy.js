const DeezerStrategy = require("passport-deezer").Strategy;
const DEEZER_CLIENT_ID = "562402";
const DEEZER_CLIENT_SECRET = "7966df434097d4c9ceaa3053f9d1590e";
const DEEZER_CLIENT_ID_APP = "567302";
const DEEZER_CLIENT_SECRET_APP = "0622a196c883ed251881e24658396e9a";
const scopes = "basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history";

module.exports.Strategy = new DeezerStrategy({
    clientID: DEEZER_CLIENT_ID,
    clientSecret: DEEZER_CLIENT_SECRET,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});

module.exports.StrategyApp = new DeezerStrategy({
    clientID: DEEZER_CLIENT_ID_APP,
    clientSecret: DEEZER_CLIENT_SECRET_APP,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});

module.exports.setIdSecret = (opts, callback) => {
    opts.clientID = (callback.includes("localhost") ? DEEZER_CLIENT_ID : DEEZER_CLIENT_ID_APP);
    opts.clientSecret = (callback.includes("localhost") ? DEEZER_CLIENT_SECRET : DEEZER_CLIENT_SECRET_APP);
}