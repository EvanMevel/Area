
module.exports = async function(req, res, server) {
    const name = req.body.name || req.query.name;
    const email = req.body.email || req.query.email;
    const password = req.body.password || req.query.password;

    if (!name || !email || !password) {
        res.status(400).json({message: "You need a name, email and password to register!"});
        return;
    }

    const users = server.base.users;
    const nameExists = await users.nameAlreadyExist(name);
    if (nameExists.length !== 0) {
        res.status(400).json({message: "A user with this name already exists!"});
        return;
    }
    const emailExists = await users.emailAlreadyExist(email);
    if (emailExists.length !== 0) {
        res.status(400).json({message: "A user with this email already exists!"});
        return;
    }

    let resp = await users.register(name, email, password);
    if (resp.affectedRows !== 1) {
        throw new Error("User registration sql should respond with a result, got an empty response instead!")
    }
    res.json({
        token: server.tokens.generate(resp.insertId)
    });
}