const Action = require("./action");
const EventType = require("../events/EventType");

const client_id = 'eab7cdc09f6346bbacd253f46f157a9b';
const client_secret = '3ee4d175c21a444998315efed44f3677';
const redirect_uri = 'http://localhost:8080/callback';
const refresh_token = 'AQAKjgeZbLUYBrkQgHIHgrHd7nyiApbd-upxZK7Kca1oh9T11zickgzydL0Z1NmILBAiJlJBetJ_8ftQkGAyTOzzEgTEHnVSfQfCGa9eg-wBq1XB6SiXwtCa_GiBVVX84a0';

async function apiToken(server) {
    let form = {
        refresh_token: refresh_token,
        redirect_uri: redirect_uri,
        grant_type: 'refresh_token'
    };
    return await server.request.post("https://accounts.spotify.com/api/token", {
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        form: form
    }).json();
}

async function getAccessToken(server) {
    const body = await apiToken(server);
    return body.access_token;
}

async function getSong(server) {
    let token = await getAccessToken(server)
    let body = await server.request.get("https://api.spotify.com/v1/me/tracks", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }).json();
    return body.items[0].track;
}

function getSentence(track) {
    let song_name = track.name;
    let song_artist = track.artists[0].name;
    //let song_link = track.external_urls.spotify;
    return {
        type: EventType.Song,
        name: song_name,
        artist: song_artist,
        string: "I Liked the track " + song_artist + " - " + song_name + " on Spotify!"
    }
}

class SPOTIFY_LIKE extends Action {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events(server) {
        let track = await getSong(server);
        const oldLiked = await server.base.actionData.getString(this.areaId);
        if (track.id !== oldLiked) {
            const sentence = getSentence(track);
            await server.base.actionData.set(this.areaId, track.id);
            return [sentence];
        } else
            return [];
    }
}

module.exports = SPOTIFY_LIKE;