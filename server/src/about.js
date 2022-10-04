
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

async function getServices(areaBase) {
    let serviceArray = [];
    const services = await areaBase.getServices();
    const actions = await areaBase.getActions();
    const reactions = await areaBase.getReactions();

    for (let i = 0; i < services.length; i++) {
        serviceArray.push(getService(services[i], actions, reactions));
    }
    return serviceArray;
}

module.exports = async function (areaBase, req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const time = Math.floor(new Date().getTime() / 1000);
    const services = await getServices(areaBase);

    const resp = {
        "client": {
            "host": ip
        },
        "server": {
            "current_time": time,
            "services": services
        }
    }
    res.send(resp);
}