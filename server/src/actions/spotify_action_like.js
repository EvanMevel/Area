const Action = require("./action");
const request = require('request-promise');
const querystring = require('querystring');

const client_id = 'eab7cdc09f6346bbacd253f46f157a9b';
const client_secret = '3ee4d175c21a444998315efed44f3677';
const redirect_uri = 'http://localhost:8080/callback';
const refresh_token = 'AQAKjgeZbLUYBrkQgHIHgrHd7nyiApbd-upxZK7Kca1oh9T11zickgzydL0Z1NmILBAiJlJBetJ_8ftQkGAyTOzzEgTEHnVSfQfCGa9eg-wBq1XB6SiXwtCa_GiBVVX84a0';

function getAuthOptions() {
    var form =  {
        refresh_token: refresh_token,
        redirect_uri: redirect_uri,
        grant_type: 'refresh_token'
    };

    let formData = querystring.stringify(form);
    let length = formData.length;

    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Length': length,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
        json: true
    };
    return authOptions;
}

async function getToken() {
    const authOptions = getAuthOptions();
    let body = await request(authOptions);
    return body.access_token;
}

async function getSong() {
    let token = await getToken()
    let get_saved_track = {
        url: 'https://api.spotify.com/v1/me/tracks',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        json: true
    };
    let body = await request(get_saved_track);
    return body.items[0].track;
}

function getSentence(track) {
    let song_name = track.name;
    let song_artist = track.artists[0].name;
    let song_link = track.external_urls.spotify;
    return (song_name + " " + song_artist);
}

class SPOTIFY_LIKE extends Action {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events(areabase) {
        let track = await getSong();
        const oldLiked = await areabase.actionData.getString(this.areaId);
        if (track.id !== oldLiked) {
            const sentence = getSentence(track);
            await areabase.actionData.set(this.areaId, track.id);
            return [sentence];
        } else
            return [];
    }
}

module.exports = SPOTIFY_LIKE;