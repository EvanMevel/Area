
// noinspection JSCheckFunctionSignatures

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require ('bcrypt');

module.exports = function (server) {
    return new LocalStrategy({usernameField: "name"},
        async function (name, password, done) {
        const users = await server.base.users.find({
            where: [
                {name: name},
                {email: name}
            ]
        });
        if (users.length < 1) {
            return done({status: 401, message: "Invalid name or password!"});
        }
        bcrypt.compare(password, users[0].password, (err, matched) => {
            if (err) {
                throw err;
            }
            if (matched) {
                return done(null, users[0].id);
            } else {
                return done({status: 401, message: "Invalid name or password!"});
            }
        });
    });
}