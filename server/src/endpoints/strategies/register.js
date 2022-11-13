
const emaiRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const nameRegex = /^[A-Za-z][A-Za-z0-9_]*$/

const crypto = require("crypto");

module.exports = function(server) {
    return async function(req, res) {
        const name = req.body.name || req.query.name;
        const email = req.body.email || req.query.email;
        const password = req.body.password || req.query.password;

        if (!name || !email || !password) {
            return res.status(400).json({message: "You need a name, email and password to register!"});
        }
        if (!email.toLowerCase().match(emaiRegex)) {
            return res.status(400).json({message: "Email is invalid!"});
        }
        if (email.length > 30) {
            return res.status(400).json({message: "Email is too long!"});
        }
        if (!name.match(nameRegex)) {
            return res.status(400).json({message: "Name is invalid!"});
        }
        if (name.length < 3) {
            return res.status(400).json({message: "Name is too short!"});
        }
        if (name.length > 30) {
            return res.status(400).json({message: "Name is too long!"});
        }
        if (password.length < 3) {
            return res.status(400).json({message: "Password is too short!"});
        }
        const users = await server.base.users.find({
            where: [
                {name: name},
                {email: email}
            ]
        });
        if (users.length !== 0) {
            res.status(400).json({message: "A user with this name or email already exists!"});
            return;
        }

        const salt = crypto.randomBytes(16).toString("hex");

        console.log("Salt: " + salt);

        crypto.scrypt(password, salt, 64, async (err, hash) => {
            if (err) {
                res.status(500).json({message: "Internal server error"});
                console.log(err);
            } else {
                const pass = salt + "$" + hash.toString("hex");
                let resp = await server.base.users.save({name: name, email: email, password: pass});
                if (resp.id == null) {
                    throw new Error("User registration sql should respond with a result, got an empty response instead!")
                }
                res.json({
                    userId: resp.id,
                    token: server.tokens.generate(resp.id)
                });
            }
        });
    }
}