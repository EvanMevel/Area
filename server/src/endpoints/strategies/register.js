
module.exports = async function(req, res, server) {
    const name = req.body.name || req.query.name;
    const email = req.body.email || req.query.email;
    const password = req.body.password || req.query.password;

    if (!name || !email || !password) {
        res.status(400).json({message: "You need a name, email and password to register!"});
        return;
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

    let resp = await server.base.users.save({name: name, email: email, password: password});
    if (resp.id == null) {
        throw new Error("User registration sql should respond with a result, got an empty response instead!")
    }
    res.json({
        token: server.tokens.generate(resp.id)
    });
}