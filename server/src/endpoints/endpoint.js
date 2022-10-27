
const BadRequest = require("./badRequest");

class Endpoint {

    async called(req, res, server) {

    }

    message(res, msg, status) {
        if (status == null) {
            status = 200;
        }
        res.status(status);
        res.json({
            "message": msg
        });
    }

    checkFieldExist(obj, field) {
        if (obj[field] == null) {
            throw new BadRequest("No " + field + " specified!");
        }
    }

    checkFieldsExist(obj, fields) {
        for (let field of fields) {
            this.checkFieldExist(obj, field)
        }
    }

}

module.exports = Endpoint;