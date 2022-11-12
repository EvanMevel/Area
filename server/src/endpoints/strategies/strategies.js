
// noinspection JSCheckFunctionSignatures

const passport = require("passport");
const register = require("./register");
const noSession = {session: false};

module.exports.passport = passport;

module.exports.jwt = passport.authenticate("jwt", noSession);

function callAuth(strategy, callback) {
    return (req, res, next) => {
        passport.authenticate(strategy, noSession, (err, user, info) => {
            if (err) {
                const status = err.code || 400;
                return res.status(status).json({message: err.message});
            }
            if (info) {
                return res.status(400).json({message: info.message});
            }
            callback(req, res, user);
            next();
        })(req, res, next);
    }
}

module.exports.registerAll = function (app, express, server) {

    app.use(passport.initialize());

    passport.use(require("./jwtStrategy"));
    passport.use(require("./deezerStategy"));
    passport.use(require("./spotifyStrategy"));
    passport.use(require("./localStrategy")(server));
    passport.use(require("./youtubeStrategy"));
    passport.use(require("./twitchStrategy"));

    const auth = express.Router();

    auth.get("/login", callAuth("local", (req, res, user) => {
        res.json({
            token: server.tokens.generate(user)
        });
    }));
    auth.post("/login", callAuth("local", (req, res, user) => {
        res.json({
            token: server.tokens.generate(user)
        });
    }));
    auth.get("/register", function (req, res) {
        register(req, res, server);
    });
    auth.post("/register", function (req, res) {
        register(req, res, server);
    });

    registerStrategy(auth, "deezer", server);
    registerStrategy(auth, "spotify", server);
    registerStrategy(auth, "youtube", server);
    registerStrategy(auth, "twitch", server);

    app.use("/auth", auth);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function authFunc(strategy, server) {
    return async function (req, res) {
        const userId = req.query.userId;
        let callback = req.query.callback;
        if (callback == null) {
            return res.status(400).json({message: "Missing callback url!"});
        }
        let state;
        do {
            state = makeid(20);
        } while (await server.base.states.findOneBy({state: state}));
        const stateObj = {
            state: state,
            callback: callback,
            userId: userId
        }
        await server.base.states.save(stateObj);
        let opts = {
            session: false,
            callbackURL: callback,
            state: state
        };
        passport.authenticate(strategy, opts)(req, res);
    }
}

function callBack(server) {
    return async function (req, res) {
        const {profile, refreshToken, accessToken} = req.user;
        const service = profile.provider;
        let stateInfo = req.stateInfo;
        const userId = stateInfo.userId;

        server.base.states.remove(stateInfo);

        let account = await server.base.accounts.findOne({
            where: {service: {name: service}, serviceUser: profile.id},
            loadRelationIds: true
        });
        if (userId == null) {
            if (account == null) {
                return res.status(401).json({
                    message: "No user associated with this account!",
                    noUser: service
                });
            }
            console.log("[AUTH] Logged in user " + account.user + " with service " + service);
            const token = server.tokens.generate(account.user);
            return res.json({
                token: token
            });
        } else {
            const user = await server.base.users.findOneBy({id: userId});
            if (user == null) {
                return res.status(500).json({message: "Could not find user!"});
            }
            if (account == null) {
                account = {service: service, serviceUser: profile.id, user: user, refreshToken: refreshToken, accessToken: accessToken};
                const resp = await server.base.accounts.save(account);
                if (resp.length === 0) {
                    return res.status(500).end();
                }
            }
            return res.json({
                message: "Connected to " + service,
                service: service
            });
        }
    }
}

function preCallBack(server, strategy) {
    return async function(req, res, next) {
        let state = req.query.state;
        if (state == null) {
            return res.status(401).json({
                message: "No state given!"
            });
        }
        let stateInfo = await server.base.states.findOneBy({state: state});
        if (stateInfo == null) {
            return res.status(401).json({
                message: "Invalid state!"
            });
        }
        req.stateInfo = stateInfo;
        let opts = {
            session: false,
            callbackURL: stateInfo.callback,
            state: state
        };
        passport.authenticate(strategy, opts)(req, res, next);
    }
}

function registerStrategy(router, strategy, server) {
    router.get("/" + strategy, authFunc(strategy, server));

    router.get("/" + strategy + "/callback", preCallBack(server, strategy), callBack(server));
}