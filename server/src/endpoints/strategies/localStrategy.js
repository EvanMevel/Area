
// noinspection JSCheckFunctionSignatures

const LocalStrategy = require("passport-local").Strategy;

module.exports = function (server) {
    return new LocalStrategy({usernameField: "name"},
        async function (name, password, done) {
        const users = await server.base.users.find({
            where: [
                {name: name},
                {email: name}
            ]
        });
        if (users.length < 1 || users[0].password !== password) {
            done("Invalid name or password!");
        }
        const id = users[0].id;
        done(null, id);
    });
}