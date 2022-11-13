const YoutubeStrategy = require('passport-youtube-v3').Strategy;
const YOUTUBE_CLIENT_ID = "49312777901-o1gs9f5rempi7mt8o528lf9dk34t4e2g.apps.googleusercontent.com";
const YOUTUBE_CLIENT_SECRET = "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";

module.exports = new YoutubeStrategy({
    clientID: YOUTUBE_CLIENT_ID,
    clientSecret: YOUTUBE_CLIENT_SECRET,
    //callbackURL: "http://localhost:8080/auth/youtube/callback",
    scope: "https://www.googleapis.com/auth/youtube.force-ssl"
}, function(accessToken, refreshToken, expires_in, profile, done) {
    if (profile.id == null)
        return done('No userId', false);
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});