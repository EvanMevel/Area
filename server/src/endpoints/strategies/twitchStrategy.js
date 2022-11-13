// reddit
// news
const TwitchStrategy = require('passport-twitch-new').Strategy;
const scopes = "user:read:follows";

module.exports = new TwitchStrategy({
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});