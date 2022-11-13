
const SpotifyStrategy = require("passport-spotify").Strategy;
const scopes = "playlist-read-collaborative playlist-modify-private playlist-modify-public playlist-read-private user-modify-playback-state user-read-currently-playing user-read-playback-state user-read-private user-read-email user-library-modify user-library-read user-follow-modify user-follow-read user-read-recently-played user-top-read streaming app-remote-control ugc-image-upload user-read-playback-position"

module.exports = new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: scopes
}, function(accessToken, refreshToken, expires_in, profile, done) {
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});