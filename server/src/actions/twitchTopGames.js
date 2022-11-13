const OAuthAction = require("./oAuthAction");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");
const TWITCH_CLIENT_ID = "kuc3fz5afh4odtlkkqe9mq5xmybkgq";

async function getTop(server, access_token)
{
    let body = await server.request.get("https://api.twitch.tv/helix/games/top", {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Client-Id': TWITCH_CLIENT_ID
        }
    });
    let data = JSON.parse(body.body).data.slice(0, 3);
    let topGames = []
    data.forEach(game => topGames.push(game.name));
    return {
        name: topGames,
        string: "Here are the 3 most watched games at the moment: " + topGames
    }
}

class TwitchTopGames extends OAuthAction {

    constructor(areaId, userId) {
        super(areaId, userId, 'twitch');
    }

    async oAuthEvent(server, account) {
        let list = await getTop(server, account.accessToken);
        if (list.length === 0)
            return [];
        else
            return [list];
    }

}

module.exports = TwitchTopGames;

module.exports.description = new ActionDescription("twitch_top_games", "Twitch top games",
    "Gets top 3 of streamed games", "twitch", EventType.GAME);