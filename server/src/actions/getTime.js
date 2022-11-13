const Action = require("./action");
const ActionDescription = require("./actionDescription");
const EventType = require("../eventType");

async function getTime(server)
{
    let body = await server.request.get("https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Paris", {
        headers: {
            'Accept': 'application/json'
        }
    });
    let data = JSON.parse(body.body);
    return {
        string: "We are " + data.date +  "and it is " + data.hour + ':' + data.minute + ':' + data.seconds
    }
}

class Time extends Action {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events(server) {
        const time = await getTime(server);
        return [time];
    }
}

module.exports = Time;

module.exports.description = new ActionDescription("time_action", "Time",
    "Get current time", "timeapi", EventType.TIME);