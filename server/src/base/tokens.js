const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class Tokens extends Table {

    constructor() {
        super("CREATE TABLE if not exists Tokens (" +
            "token VARCHAR(30) NOT NULL PRIMARY KEY, " +
            "userId INT NOT NULL, " +
            "expire INT UNSIGNED NOT NULL, " +
            "FOREIGN KEY (userId) REFERENCES Users (id)" +
            ")");
    }

    async getToken(userId) {
        const sql = "SELECT * FROM `Tokens` WHERE userId = " + q(userId);
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async getTokenUser(token) {
        const sql = "SELECT * FROM `Tokens` WHERE token = " + q(token);
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async setToken(token, userId, expire) {
        const sql = "INSERT INTO Tokens (token, userId, expire) VALUES (" +
            q(token) + ", " +
            q(userId) + ", " +
            q(expire) +
            ")";
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async removeToken(userId) {
        const sql = "DELETE FROM Tokens WHERE Tokens.userId = " + q(userId);
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }
}

module.exports = Tokens;