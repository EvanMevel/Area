
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

function authFunc(strategy) {
    return function (req, res) {
        const userId = req.query.userId;
        let opts = {
            session: false,
            state: userId
        };
        passport.authenticate(strategy, opts)(req, res);
    }
}

function callBack(server) {
    return async function (req, res) {
        let userId = req.query.state;
        const {profile, refreshToken, accessToken} = req.user;
        const service = profile.provider;
        let account = await server.base.accounts.findOneBy({service: {name: service}, serviceUser: profile.id});
        if (userId == null) {
            if (account == null) {
                res.status(401).end("Unauthorized");
                return;
            }
            const token = server.tokens.generate(account.userId);
            res.redirect("http://localhost:8081?token=" + token);
        } else {
            const user = await server.base.users.findOneBy({id: userId});
            if (account == null) {
                account = {service: service, serviceUser: profile.id, user: user, refreshToken: refreshToken, accessToken: accessToken};
                const resp = await server.base.accounts.save(account);
                if (resp.length === 0) {
                    return res.status(500).end();
                }
            }
            return res.redirect("http://localhost:8081?connectedService=" + service);
        }
    }
}

function registerStrategy(router, strategy, server) {
    router.get("/" + strategy, authFunc(strategy));

    router.get("/" + strategy + "/callback", passport.authenticate(strategy, noSession), callBack(server));
}