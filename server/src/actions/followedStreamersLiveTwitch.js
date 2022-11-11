const OAuthAction = require("./oAuthAction");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");
const TWITCH_CLIENT_ID = "kuc3fz5afh4odtlkkqe9mq5xmybkgq";

async function getList(server, access_token)
{
    //const clientId = getClientId();
    let body = await server.request.get("https://api.twitch.tv/helix/search/channels?query=domingo", {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Client-Id': TWITCH_CLIENT_ID
        }
    });
    let data = JSON.parse(body.body).data[0];

    return {
        type: EventType.CHANNELS,
        channel: data.display_name,
        is_live: data.is_live,
        string: data.display_name + " is actually live ! '" + data.display_name + " - " + data.title + "'. Game: " + data.game_name
    }
}

class TwitchLive extends OAuthAction {

    constructor(areaId, userId) {
        super(areaId, userId, 'twitch');
    }

    async oAuthEvent(server, account) {
        let ret = await getList(server, account.accessToken);
        console.log(ret);
        if (ret.is_live === true)
            return [ret];
        else
            return [];
    }

}

module.exports = TwitchLive;

module.exports.description = new ActionDescription("twitch_live", "Twitch live on",
    "Gets a list of live followed streamers", "twitch", EventType.CHANNELS);