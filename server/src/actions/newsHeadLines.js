const OAuthAction = require("./oAuthAction");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");

async function getHeadLine(server)
{
    let body = await server.request.get("https://newsapi.org/v2/top-headlines?country=fr&apiKey=" + process.env.NEWS_API_KEY);
    let article = JSON.parse(body.body).articles[0];
    return {
        type: EventType.HEADLINE,
        author: article.author,
        title: article.title,
        url: article.url,
        source: article.source.name,
        string: "New article from: " + article.author + " - " + article.title + ". You can find it at: " + article.url + " (Source: " + article.source.name + ").",
        id: article.publishedAt
    }
}

class NewsHeadLines extends OAuthAction {

    constructor(areaId, userId) {
        super(areaId, userId, 'spotify');
    }

    async oAuthEvent(server, account) {
        let data = await getHeadLine(server);
        const oldLiked = await this.getDataString(server);
        if (data.id !== oldLiked) {
            await this.setData(server, data.id)
            return [data];
        }
        else {
            return [];
        }
    }

}

module.exports = NewsHeadLines;

module.exports.description = new ActionDescription("news_headlines", "News HeadLines",
    "Get french headlines", "news", EventType.HEADLINE);