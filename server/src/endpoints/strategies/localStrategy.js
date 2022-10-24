
// noinspection JSCheckFunctionSignatures

const LocalStrategy = require("passport-local").Strategy;

module.exports = function (server) {
    return new LocalStrategy(async function (username, password, done) {
        let resp = await server.base.users.login(username);
        if (!resp.length || resp[0].password !== password) {
            done("Invalid name or password!");
        }
        const id = resp[0].id;
        done(null, id);
    });
}