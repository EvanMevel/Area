const ReactionDescription = require("./reactionDescription");
const EventType = require("../eventType");
const OAuthReaction = require("./oAuthReaction");

async function trackId(track, access_token, server)
{
    let body = await server.request.get("https://api.spotify.com/v1/search?q=" + track + "&type=track", {
        header: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
    });
    console.log(body)
}

async function likeASong(track, server, access_token)
{
    await trackId(track, access_token, server);
}

class SpotifyLike extends OAuthReaction {

    constructor(areaId, userId) {
        super(areaId, userId, 'spotify');
    }

    async oAuthIngest(event, server, account) {
        const access_token = await this.getAccessToken(server, account.refresh_token);
        if (event.type === EventType.SONG) {
            await likeASong(event.artist + " - " + event.name, server, access_token);
        } else {
            console.error("SpotifyLike: Cant process event " + event.string);
        }
    }
}
module.exports = SpotifyLike;

module.exports.description = new ReactionDescription("spotify_reaction_like", "Spotify Like",
    "Likes the track on Spotify", "spotify", [EventType.SONG]);