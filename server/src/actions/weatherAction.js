const Action = require('./action');
const EventType = require("../eventType");

const token = "ee775a81f3d9965a0bca1a2e0da2aa7e845b4a976eb0d955c53ea90a4e2efba8";

async function getCity(server) {
    const body = await server.request.get("https://api.meteo-concept.com/api/location/city?token=" + token).json();
    return body.city.insee;
}

function getHeat(temp, rain) {
    if (temp >= 21)
        return "hot";
    else if (temp <= 8)
        return "freezing";
    else if (temp >= 12)
        return "ideal"
    else if (rain > 70)
        return "rainy";
    else
        return "cold";
}

async function getWeatherFromHour(server) {
    let city_code = await getCity(server);
    const body = await server.request.get("https://api.meteo-concept.com/api/forecast/nextHours?token=" + token + "&insee=" + city_code).json();
    let fore = body.forecast;
    let temp = fore[0].temp2m;
    let rain = fore[0].probarain;
    let heat = getHeat(temp, rain);
    return {
        type: EventType.Weather,
        heat: heat,
        temp: temp,
        string: "In the next hour, the weather will be " + heat + ", with a temperature of " + temp + "°C."
    }
}

class Weather extends Action {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events(server) {
        const weather = await getWeatherFromHour(server);
        return [weather];
    }
}

module.exports = Weather;