
class Services {
    list = {};

    constructor() {
        this.add("spotify", "Spotify", 1);
        this.add("deezer", "Deezer", 1);
        this.add("discord", "Discord", 0);
        this.add("meteo_concept", "Météo Concept", 0);
        this.add("youtube", "Youtube", 0);
    }

    add(name, displayName, oauth) {
        this.list[name] = {
            name: name,
            displayName: displayName,
            oauth: oauth
        }
    }

    isOauth(id) {
        const service = this.list[id];
        if (service == null) {
            return false;
        }
        return service.oauth;
    }

    async registerServices(base) {
        for (let id in this.list) {
            let service = this.list[id];
            await base.services.save(service);
        }
    }

}

module.exports = new Services();