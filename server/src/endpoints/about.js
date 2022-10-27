
const Endpoint = require("./endpoint");

function getFiles(service) {
    return {
        "logo": "http://localhost:8080/files/" + service + "/" + service + ".png",
        "large": "http://localhost:8080/files/" + service + "/" + service + "-large.png"
    }
}

async function getService(base, service) {
    const actions = await base.actions.findBy({service: service});
    const reactions = await base.reactions.findBy({service: service});

    let resp = service;
    resp["actions"] = actions;
    resp["reactions"] = reactions;
    resp.files = getFiles(service.name);
    return resp;
}

async function getServices(areabase) {
    let serviceArray = [];
    const services = await areabase.services.find();

    for (let i = 0; i < services.length; i++) {
        serviceArray.push(await getService(areabase, services[i]));
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