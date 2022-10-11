async function registerServices(areabase) {
    await areabase.services.create("facebook", "Facebook", 0);
    await areabase.services.create("spotify", "Spotify", 0);
    await areabase.services.create("deezer", "Deezer", 0);
}

module.exports = registerServices;