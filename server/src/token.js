const jwt = require('jsonwebtoken');

const secret = "8ybH2bbjeniaP8HNupR75m9bhFVBC5%&mwzBDZKhuS6S7C3A^Zo8vax^jP&BmzERLNW#ZjT4oFjf5ayX&Rq38YCauDJfrpBRiXpikeFaSaB!VNSN2WajzSmTV4VZmHYA"

function generate(userId) {
    return jwt.sign({user: userId}, secret);
}

function verify(token) {
    try {
        let decoded = jwt.verify(token, secret);
        return decoded.user;
    } catch(err) {
        return null;
    }
}

module.exports.generate = generate;

module.exports.verify = verify;