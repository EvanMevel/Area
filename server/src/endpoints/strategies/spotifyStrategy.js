
const SpotifyStrategy = require("passport-spotify").Strategy;
const SPOTIFY_CLIENT_ID = 'eab7cdc09f6346bbacd253f46f157a9b';
const SPOTIFY_CLIENT_SECRET = "3ee4d175c21a444998315efed44f3677";
const scopes = "user-read-playback-state user-read-currently-playing playlist-read-collaborative playlist-read-private user-library-read user-top-read user-read-recently-played user-read-playback-position user-follow-read";

module.exports = new SpotifyStrategy({
    clientID: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/spotify/callback",
    scope: scopes
}, function(accessToken, refreshToken, expires_in, profile, done) {
    console.log(JSON.stringify(profile));
    done(null, {
        profile: profile,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});