const Reaction = require('./reaction');

const user_id = "5145325362";
const access_token = "frWv67bkYctVHBxUctx2yO1XJm8HYEmD0NgS3M9d2fmHfAwkXH";

async function getTrackId(track_name, server) {
    const body = await server.request.get("https://api.deezer.com/search?acces_token=" + access_token + "&q=" + track_name).json();
    return body.data[0].id;
}

async function likeASong(track_name, server) {
    let track_id = await getTrackId(track_name, server);
    await server.request.post("https://api.deezer.com/user/" + user_id + "/tracks?track_id=" + track_id + "&access_token=" + access_token);
}

class DEEZER_LIKE extends Reaction {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async ingest(event, server) {
        await likeASong(event, server);
    }

}

module.exports = DEEZER_LIKE;