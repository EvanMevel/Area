const Reaction = require('./reaction');
const request = require('request-promise');

const user_id = "5145325362";
const access_token = "frWv67bkYctVHBxUctx2yO1XJm8HYEmD0NgS3M9d2fmHfAwkXH";
let tid = null;

async function getTrackId(track_name) {
    await request.get("https://api.deezer.com/search?acces_token=" + access_token + "&q=" + track_name, function(res, body, err) {
        let search = JSON.parse(body.body);
        tid = search.data[0].id;
    });
    return tid;
}

async function likeASong(track_name) {
    let track_id = await getTrackId(track_name);
    await request.post("https://api.deezer.com/user/" + user_id + "/tracks?track_id=" + track_id + "&access_token=" + access_token);
}

class DEEZER_LIKE extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, areabase) {
        await likeASong(event);
    }

}

module.exports = DEEZER_LIKE;