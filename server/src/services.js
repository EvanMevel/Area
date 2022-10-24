
class Services {
    list = {};

    constructor() {
        this.add("spotify", "Spotify", 1);
        this.add("deezer", "Deezer", 1);
        this.add("discord", "Discord", 0);
        this.add("meteo_concept", "Météo Concept", 0);
    }

    add(id, name, oauth) {
        this.list[id] = {
            id: id,
            name: name,
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

    async registerServices(areabase) {
        for (let id in this.list) {
            let service = this.list[id];
            await areabase.services.create(service.id, service.name, service.oauth);
        }
    }

}

module.exports = new Services();