
async function registerServices(areabase) {
    await areabase.services.create("spotify", "Spotify", 0);
    await areabase.services.create("deezer", "Deezer", 0);
    await areabase.services.create("discord", "Discord", 0);
    await areabase.services.create("meteo_concept", "Météo Concept", 0);
}

module.exports = registerServices;