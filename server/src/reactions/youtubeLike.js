const ReactionDescription = require("./reactionDescription");
const EventType = require("../eventType");
const OAuthReaction = require("./oAuthReaction");

async function likeAVideo(server, access_token, id)
{
    server.request.post("https://content-youtube.googleapis.com/youtube/v3/videos/rate?id=" + id + "&rating=like", {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json'
        }
    })
}

class YoutubeLike extends OAuthReaction {

    constructor(areaId, userId) {
        super(areaId, userId, 'youtube');
    }

    async oAuthIngest(event, server, account) {
        const access_token = await this.getAccessToken(server, account.refreshToken);
        if (event.type === EventType.VIDEO) {
            await likeAVideo(server, access_token, event.id);
        } else {
            console.error("YoutubeLike: Cant process event " + event.string);
        }
    }
}
module.exports = YoutubeLike;

module.exports.description = new ReactionDescription("youtube_like_video", "Youtube Like",
    "Likes given video on Youtube", "youtube_oauth", [EventType.VIDEO]);