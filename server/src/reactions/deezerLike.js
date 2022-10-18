const OAuthReaction = require('./oAuthReaction');
const EventType = require("../eventType");

const user_id = "5145325362";

async function getTrackId(track_name, server, access_token) {
    const body = await server.request.get("https://api.deezer.com/search?acces_token=" + access_token + "&q=" + track_name).json();
    return body.data[0].id;
}

async function likeASong(track_name, server, access_token) {
    let track_id = await getTrackId(track_name, server, access_token);
    await server.request.post("https://api.deezer.com/user/" + user_id + "/tracks?track_id=" + track_id + "&access_token=" + access_token);
}

class DeezerLike extends OAuthReaction {

    constructor(areaId, userId) {
        super(areaId, userId, 'deezer');
    }

    async oAuthIngest(event, server, token) {
        if (event.type === EventType.Song) {
            await likeASong(event.artist + " - " + event.name, server, token);
        } else {
            console.error("DeezerLike: Cant process event " + event.string);
        }
    }

}

module.exports = DeezerLike;