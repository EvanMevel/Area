
// noinspection JSCheckFunctionSignatures

const LocalStrategy = require("passport-local").Strategy;

const crypto = require("crypto");

module.exports = function (server) {
    return new LocalStrategy(
        {usernameField: "name"},
        async function (name, password, done) {
            const users = await server.base.users.find({
                where: [
                    {name: name},
                    {email: name}
                ]
            });
            if (users.length < 1 || password.size < 1) {
                return done({status: 401, message: "Invalid name or password!"});
            }
            const [salt, hash] = users[0].password.split("$");
            crypto.scrypt(password, salt, 64, (err, hashPass) => {
                if (err) {
                    console.log(err);
                    return done({status: 500, message: "Internal server error!"});
                } else {
                    if (hash === hashPass.toString("hex")) {
                        return done(null, users[0].id);
                    } else {
                        return done({status: 401, message: "Invalid name or password!"});
                    }
                }
            });
        }
    );
}