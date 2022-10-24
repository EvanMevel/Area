
class ArDescription {
    id;
    name;
    description;
    service;

    constructor(id, name, description, service) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.service = service;
    }
}

module.exports = ArDescription;