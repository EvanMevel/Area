
const Endpoint = require("./endpoint");

function filterAndCleanup(service, array) {
    let result = array.filter(function (element) {
        return element.service === service.name;
    });
    result.forEach(function (element) {
        delete element["service"];
    });
    return result;
}

function getService(service, actions, reactions) {
    let serviceActions = filterAndCleanup(service, actions);
    let serviceReactions = filterAndCleanup(service, reactions);

    let resp = service;
    resp["actions"] = serviceActions;
    resp["reactions"] = serviceReactions;
    return resp;
}

async function getServices(areabase) {
    let serviceArray = [];
    const services = await areabase.services.getAllServices();
    const actions = await areabase.actions.getAll();
    const reactions = await areabase.reactions.getAll();

    for (let i = 0; i < services.length; i++) {
        serviceArray.push(getService(services[i], actions, reactions));
    }
    return serviceArray;
}

class About extends Endpoint {

    async called(req, res, server) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const time = Math.floor(new Date().getTime() / 1000);
        const services = await getServices(server.base);

        const resp = {
            "client": {
                "host": ip
            },
            "server": {
                "current_time": time,
                "services": services
            }
        }
        res.json(resp);
    }
}

module.exports = new About();