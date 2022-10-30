
const SpotifyStrategy = require("passport-spotify").Strategy;
const SPOTIFY_CLIENT_ID = 'eab7cdc09f6346bbacd253f46f157a9b';
const SPOTIFY_CLIENT_SECRET = "3ee4d175c21a444998315efed44f3677";
// const scopes = "user-read-playback-state user-read-currently-playing playlist-read-collaborative playlist-read-private user-library-read user-top-read user-read-recently-played user-read-playback-position user-follow-read user-read-private";
const scopes = "playlist-read-collaborative playlist-modify-private playlist-modify-public playlist-read-private user-modify-playback-state user-read-currently-playing user-read-playback-state user-read-private user-read-email user-library-modify user-library-read user-follow-modify user-follow-read user-read-recently-played user-top-read streaming app-remote-control ugc-image-upload user-read-playback-position"

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