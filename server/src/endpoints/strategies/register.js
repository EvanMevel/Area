
const emaiRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const nameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/

const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports = async function(req, res, server) {
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
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
            throw err;
        }
        let resp = await server.base.users.save({name: name, email: email, password: hash});
        if (resp.id == null) {
            throw new Error("User registration sql should respond with a result, got an empty response instead!")
        }
        res.json({
            token: server.tokens.generate(resp.id)
        });
    })
}