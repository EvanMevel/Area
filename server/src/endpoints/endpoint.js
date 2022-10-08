
class Endpoint {

    async called(req, res, server) {

    }

    message(res, msg, status) {
        if (status == null) {
            status = 200;
        }
        res.status(status);
        res.send({
            "message": msg
        });
    }

    checkFieldExist(res, obj, field) {
        if (obj[field] == null) {
            this.message(res, "No " + field + " specified!", 400);
            return false;
        }
        return true;
    }

    checkFieldsExist(res, obj, fields) {
        for (let field of fields) {
            if (!this.checkFieldExist(res, obj, field)) {
                return false;
            }
        }
        return true;
    }

}

module.exports = Endpoint;