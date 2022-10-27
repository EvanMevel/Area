const OAuthAction = require("./oAuthAction");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");

async function getSong(server, access_token) {
    let body = await server.request.get("https://api.spotify.com/v1/me/tracks", {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
    }).json();
    return body.items[0].track;
}

function getSentence(track) {
    let song_name = track.name;
    let song_artist = track.artists[0].name;
    return {
        type: EventType.SONG,
        name: song_name,
        artist: song_artist,
        string: "I Liked the track " + song_artist + " - " + song_name + " on Spotify!"
    }
}

class SpotifyLike extends OAuthAction {

    constructor(areaId, userId) {
        super(areaId, userId, 'spotify');
    }

    async oAuthEvent(server, account) {
        const access_token = await this.getAccessToken(server, account.refresh_token);
        let track = await getSong(server, access_token);
        const oldLiked = await server.base.actionData.getString(this.areaId);
        if (track.id !== oldLiked) {
            const sentence = getSentence(track);
            await server.base.actionData.set(this.areaId, track.id);
            return [sentence];
        } else {
            return [];
        }
    }

}

module.exports = SpotifyLike;

module.exports.description = new ActionDescription("spotify_action_like", "Spotify Listen Likes",
    "Listen to user liking a track on spotify", "spotify", EventType.SONG);