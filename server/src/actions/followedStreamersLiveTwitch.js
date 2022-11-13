const OAuthAction = require("./oAuthAction");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");
const TWITCH_CLIENT_ID = "kuc3fz5afh4odtlkkqe9mq5xmybkgq";

async function getList(server, access_token, userId)
{

    let body = await server.request.get("https://api.twitch.tv/helix/streams/followed?user_id=" + userId, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Client-Id': TWITCH_CLIENT_ID
        }
    });
    let data = JSON.parse(body.body).data;
    if (data.length === 0)
        return [];
    let StreamersList = [];
    data.forEach(streamer => StreamersList.push(streamer.user_name));
   return {
       type: EventType.CHANNELS,
       artist: StreamersList,
       string: "Followed streamers on live: " + StreamersList
   };
}

class TwitchLive extends OAuthAction {

    constructor(areaId, userId) {
        super(areaId, userId, 'twitch');
    }

    async oAuthEvent(server, account) {
        let list = await getList(server, account.accessToken, account.serviceUser);
        if (list.length === 0)
            return [];
        else
            return [list];
    }

}

module.exports = TwitchLive;

module.exports.description = new ActionDescription("twitch_live", "Twitch live on",
    "Gets a list of live followed streamers", "twitch", EventType.CHANNELS);