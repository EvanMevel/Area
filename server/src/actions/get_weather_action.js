const Action = require('./action');
const request = require('request-promise');

const token = "ee775a81f3d9965a0bca1a2e0da2aa7e845b4a976eb0d955c53ea90a4e2efba8";
let city_code = "";
let concat = "";

async function getCity() {
    await request.get("https://api.meteo-concept.com/api/location/city?token=" + token, function(res, body, err) {
        let infos = JSON.parse(body.body);
        city_code = infos.city.insee;
    })
    return city_code;
}

async function getHeat(temp, rain) {
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

async function getWeatherFromHour() {
    let city_code = await getCity();
    await request.get("https://api.meteo-concept.com/api/forecast/nextHours?token=" + token + "&insee=" + city_code, async function(res, err, body) {
        let bod = JSON.parse(body);
        let fore = bod.forecast;
        let temp = fore[0].temp2m;
        let rain = fore[0].probarain;
        let heat = await getHeat(temp, rain);
        concat = "@everyone\nIn the next hour, the weather will be " + heat + ", with a temperature of " + temp + "°C.";
    })
    return concat;
}

class GET_WEATHER extends Action {

    constructor(areaId, userId) {
        super(areaId, userId);
    }

    async events(areabase) {
        const weather = await getWeatherFromHour();
        return [weather];
    }
}

module.exports = GET_WEATHER;