const Action = require("./action");
const request = require('request-promise');
const querystring = require('querystring');

var client_id = 'eab7cdc09f6346bbacd253f46f157a9b';
var client_secret = '3ee4d175c21a444998315efed44f3677';
var redirect_uri = 'http://localhost:8080/callback';
var refresh_token = 'AQAKjgeZbLUYBrkQgHIHgrHd7nyiApbd-upxZK7Kca1oh9T11zickgzydL0Z1NmILBAiJlJBetJ_8ftQkGAyTOzzEgTEHnVSfQfCGa9eg-wBq1XB6SiXwtCa_GiBVVX84a0';

function getAuthOptions() {
    var form =  {
        refresh_token: refresh_token,
        redirect_uri: redirect_uri,
        grant_type: 'refresh_token'
    };

    var formData = querystring.stringify(form);
    var contentlenght = formData.length;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Length': contentlenght,
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
};

async function getSong() {
    var token = await getToken()
    var get_saved_track = {
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
};

function getSentence(track) {
    var song_name = track.name;
    var song_artist = track.artists[0].name;
    var song_link = track.external_urls.spotify;
    var sentence = "I liked the song: " + song_name + ", written by: " + song_artist + ", and here is the link: " + song_link;
    return sentence;
};

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