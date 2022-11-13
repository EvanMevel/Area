
// noinspection JSCheckFunctionSignatures

const passport = require("passport");
const register = require("./register");
const crypto = require("crypto");
const deezer = require("./deezerStategy");
const noSession = {session: false};

module.exports.passport = passport;

module.exports.jwt = (req, res, next) => {
    passport.authenticate("jwt", noSession, (err, user, info) => {
        if (err || info || !user) {
            console.log("[HTTP] >> Unauthorized: null or invalid token");
            return res.status(401).json({message: "Unauthorized"});
        }
        req.user = user;
        next();
    })(req, res, next);
};

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

function login(server) {
    return callAuth("local", (req, res, user) => {
        res.json({
            userId: user,
            token: server.tokens.generate(user)
        });
    })
}

module.exports.registerAll = function (app, express, server) {

    app.use(passport.initialize());

    passport.use(require("./jwtStrategy"));
    passport.use("deezer", deezer.Strategy);
    passport.use("deezerapp", deezer.StrategyApp);
    passport.use(require("./spotifyStrategy"));
    passport.use(require("./localStrategy")(server));
    passport.use(require("./youtubeStrategy"));
    passport.use(require("./twitchStrategy"));

    const auth = express.Router();

    auth.route("/login")
        .get(login(server))
        .post(login(server));

    auth.route("/register")
        .get(register(server))
        .post(register(server));

    registerStrategy(auth, "deezer", server);
    registerStrategy(auth, "spotify", server);
    registerStrategy(auth, "youtube", server);
    registerStrategy(auth, "twitch", server);

    app.use("/auth", auth);
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
            state = crypto.randomBytes(8).toString("hex");
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
        if (strategy === "deezer") {
            if (callback.includes("localhost")) {
                passport.authenticate(strategy, opts)(req, res);
            } else {
                console.log("[HTTP] << Changing service to be deezerapp");
                passport.authenticate(strategy + "app", opts)(req, res);
            }
            return;
        }
        passport.authenticate(strategy, opts)(req, res);
    }
}

function callBack(server) {
    return async function (req, res) {
        const {profile, refreshToken, accessToken, error} = req.user;
        const service = profile.provider;
        let stateInfo = req.stateInfo;
        const userId = stateInfo.userId;

        server.base.states.remove(stateInfo);

        if (error) {
            return res.status(400).json({
                message: error
            })
        }

        let account = await server.base.accounts.findOne({
            where: {service: {name: service}, serviceUser: profile.id},
            loadRelationIds: true
        });
        if (userId == null) {
            if (account == null) {
                console.log("[HTTP] >> " + JSON.stringify({
                    message: "No user associated with this account!",
                    noUser: service
                }));
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
            let alreadyAccount = await server.base.accounts.findOne({
                where: {service: {name: service}, user: user},
                loadRelationIds: true
            });
            if (alreadyAccount != null) {
                return res.json({
                    message: "You already have linked an account!",
                    service: service
                });
            }
            if (account == null) {
                account = {service: service, serviceUser: profile.id, user: user, refreshToken: refreshToken, accessToken: accessToken};
                const resp = await server.base.accounts.save(account);
                if (resp.length === 0) {
                    return res.status(500).end();
                }
                return res.json({
                    message: "Connected to " + service,
                    service: service
                });
            }
            return res.json({
                message: "Account already linked to another user!",
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
        if (strategy === "deezer") {
            if (stateInfo.callback.includes("localhost")) {
                passport.authenticate(strategy, opts)(req, res, next);
            } else {
                console.log("[HTTP] << Changing service to be deezerapp");
                passport.authenticate(strategy + "app", opts)(req, res, next);
            }
            return;
        }
        passport.authenticate(strategy, opts)(req, res, next);
    }
}

function registerStrategy(router, strategy, server) {
    router.get("/" + strategy, authFunc(strategy, server));

    router.get("/" + strategy + "/callback", preCallBack(server, strategy), callBack(server));
}