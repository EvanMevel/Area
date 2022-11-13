const TWITCH_CLIENT_ID = "kuc3fz5afh4odtlkkqe9mq5xmybkgq";
const TWITCH_CLIENT_SECRET = "xte2bekynu69lhy2l70uaxc5i336te";
const TwitchStrategy = require('passport-twitch-new').Strategy;
const scopes = "user:read:follows";

module.exports = new TwitchStrategy({
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/twitch/callback",
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});