
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = "8ybH2bbjeniaP8HNupR75m9bhFVBC5%&mwzBDZKhuS6S7C3A^Zo8vax^jP&BmzERLNW#ZjT4oFjf5ayX&Rq38YCauDJfrpBRiXpikeFaSaB!VNSN2WajzSmTV4VZmHYA"

module.exports = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}, function (jwt_payload, cb) {
    cb(null, jwt_payload.user);
});