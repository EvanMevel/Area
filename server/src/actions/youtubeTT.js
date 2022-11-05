const {google} = require('googleapis');
const OAuthAction = require("./oAuthAction");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");
const service = google.youtube({
    version: 'v3',
    auth: 'AIzaSyBfBGLf3ZaqpcmuWKLHeTwNXO6s-pAk-6w'
});

async function getVideo()
{
    const res = await service.videos.list({
        "part": [
            "id, snippet"
        ],
        "chart": "mostPopular",
        "regionCode": "FR"
    });
    return {
        id: res.data.items[0].id,
        title: res.data.items[0].snippet.title,
        channel: res.data.items[0].snippet.channelTitle
    }
}

async function getSentence(video)
{
    return {
        type: EventType.VIDEO,
        name: video.title,
        artist: video.channel,
        string: "The most french popular video is " + video.title + " by " + video.channel + ".",
        id: video.id
    }
}

class YoutubeTT extends OAuthAction {

    constructor(areaId, userId) {
        super(areaId, userId, 'spotify');
    }

    async oAuthEvent(server, account) {
        let title = await getVideo();
        const oldTitle = await this.getDataString(server);
        if (oldTitle !== title.id) {
            await this.setData(server, title.id);
            return [await getSentence(title)];
        } else {
            return [];
        }
    }

}

module.exports = YoutubeTT;

module.exports.description = new ActionDescription("youtube_tt_fr", "Youtube gets TT Fr",
    "Gets the most popular french video on youtube", "youtube", EventType.VIDEO);