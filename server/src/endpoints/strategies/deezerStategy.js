
const DeezerStrategy = require("passport-deezer").Strategy;
const DEEZER_CLIENT_ID = "562402";
const DEEZER_CLIENT_SECRET = "7966df434097d4c9ceaa3053f9d1590e";
const scopes = "basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history";

module.exports = new DeezerStrategy({
    clientID: DEEZER_CLIENT_ID,
    clientSecret: DEEZER_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/deezer/callback",
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});