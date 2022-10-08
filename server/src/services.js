

async function registerServices(areabase) {
    await areabase.services.create("facebook", "Facebook", 0);
}

module.exports = registerServices;