const ReactionDescription = require("./reactionDescription");
const EventType = require("../eventType");
const OAuthReaction = require("./oAuthReaction");

async function trackId(track, access_token, server)
{
    let body = await server.request.get("https://api.spotify.com/v1/search?q=" + track + "&type=track&access_token=" + access_token, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).json();
    return body.tracks.items[0].id;
}

async function likeASong(track, server, access_token)
{
    const id = await trackId(track, access_token, server);
    await server.request.put("https://api.spotify.com/v1/me/tracks?access_token=" + access_token + "&ids=" + id);
}

class SpotifyLike extends OAuthReaction {

    constructor(areaId, userId) {
        super(areaId, userId, 'spotify');
    }

    async oAuthIngest(event, server, account) {
        const access_token = await this.getAccessToken(server, account.refreshToken);
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