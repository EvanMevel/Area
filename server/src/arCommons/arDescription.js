
class ArDescription {
    name;
    displayName;
    description;
    serviceName;

    constructor(name, displayName, description, service) {
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.serviceName = service;
    }
}

module.exports = ArDescription;