const OAuthAction = require("./oAuthAction");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");

async function getSong(server, access_token)
{
    let body = await server.request.get("https://api.deezer.com/user/me/tracks?access_token=" + access_token).json();
    return body.data[body.data.length - 1];
}

function getSentence(track)
{
    return {
        type: EventType.SONG,
        name: track.title,
        artist: track.artist.name,
        string: "I Liked the track " + track.artist.name + " - " + track.title + " on Deezer!"
    }
}

class DeezerLike extends OAuthAction {

    constructor(areaId, userId) {
        super(areaId, userId, 'deezer');
    }

    async oAuthEvent(server, account) {
        const access_token = account.access_token;
        const track = await getSong(server, access_token);
        const oldLiked = await server.base.actionData.getString(this.areaId);
        if (track !== undefined && track.id !== oldLiked) {
            const sentence = getSentence(track);
            await server.base.actionData.set(this.areaId, track.id);
            return [sentence];
        } else {
            return [];
        }
    }

}

module.exports = DeezerLike;

module.exports.description = new ActionDescription("deezer_action_like", "Deezer Listen Likes",
    "Listen to user liking a track on Deezer", "deezer", EventType.SONG);