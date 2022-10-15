
class BadRequest extends Error {

    message;

    constructor(message) {
        super();
        this.message = message;
    }

}

module.exports = BadRequest;