
// noinspection JSCheckFunctionSignatures

const passport = require("passport");
const register = require("./register");
const noSession = {session: false};

module.exports.passport = passport;

module.exports.jwt = passport.authenticate("jwt", noSession);

module.exports.registerAll = function (app, express, server) {

    app.use(passport.initialize());

    passport.use(require("./jwtStrategy"));
    passport.use(require("./deezerStategy"));
    passport.use(require("./spotifyStrategy"));
    passport.use(require("./localStrategy")(server));

    const auth = express.Router();

    auth.get("/login", passport.authenticate("local", noSession), function (req, res) {
        res.json({
            token: server.tokens.generate(req.user)
        });
    });
    auth.get("/register", function (req, res) {
        register(req, res, server);
    });

    registerStrategy(auth, "deezer", server);
    registerStrategy(auth, "spotify", server);

    app.use("/auth", auth);

    app.get("/tests", function (req, res) {
        const strategy = server.passport._strategy("spotify");
        const params = {
            grant_type: "refresh_token"
        }
        console.log(JSON.stringify(strategy));
        strategy._oauth2.getOAuthAccessToken("AQDvf_SwHDdiW_-YufwL9-q7gW2ygUGcvIP5KAmtmi0MChR7LPO9BFmN4bZhMHQHJqnZBoXSJQxhmHcvc61jMyxrZjpV8gaIqVH1pFUG-_KkZhcMcG9n2lYmTn0ruXjpNzU",
            params,
            (err, access_token, refresh_token, expires_in, results) => {
                console.log(JSON.stringify(err));
                console.log(JSON.stringify(access_token));
                console.log(JSON.stringify(refresh_token));
                console.log(JSON.stringify(expires_in));
                console.log(JSON.stringify(results));
                res.send("EHAUIBEZJAEBHJAZLE");
            });
    })

    app.get("/ttst", function (req, res) {
        require("./ttest")(req, res, server);
    });
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
        if (userId == null) {
            userId = await server.base.accounts.getUserId(service, profile.id);
            if (userId == null || userId.length === 0) {
                res.status(401).end("Unauthorized");
                return;
            }
            const token = server.tokens.generate(userId[0].userId);
            res.redirect("http://localhost:8081?token=" + token);
        } else {
            const already = await server.base.accounts.getUserId(service, profile.id);
            if (already.length === 1) {
                res.redirect("http://localhost:8081?connectedService=" + service);
                return;
            }
            const resp = await server.base.accounts.create(userId, service, profile.id, refreshToken, accessToken);
            if (resp.length === 0) {
                res.status(500).end();
            } else {
                res.redirect("http://localhost:8081?connectedService=" + service);
            }
        }
    }
}

function registerStrategy(router, strategy, server) {
    router.get("/" + strategy, authFunc(strategy));

    router.get("/" + strategy + "/callback", passport.authenticate(strategy, noSession), callBack(server));
}