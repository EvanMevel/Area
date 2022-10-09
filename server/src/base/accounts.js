const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class Accounts extends Table {

    constructor() {
        super("CREATE TABLE if not exists Accounts (" +
            "userId INT NOT NULL," +
            "service VARCHAR(30) NOT NULL," +
            "token VARCHAR(255) NOT NULL," +
            "FOREIGN KEY (service) REFERENCES Services (name)," +
            "PRIMARY KEY (userId, service)" +
            ")");
    }

    async create(userId, service, token) {
        const sql = "INSERT INTO Accounts (`userId`, `service`, `token`) VALUES (" +
            q(userId) + ", " +
            q(service) + ", " +
            q(token) +
            ")";
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async delete(userId, service) {
        const sql = "DELETE FROM Accounts WHERE " +
            "Accounts.userId = " + q(userId) +
            " AND Accounts.service = " + q(service);
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async getUser(userId) {
        const [rows, fields] = await this.con.query("Select service, token FROM Accounts WHERE Accounts.userId = " + q(userId));
        return rows;
    }

    async getToken(userId, service) {
        const [rows, fields] = await this.con.query("Select token FROM Accounts WHERE Accounts.userId = " + q(userId) +
            " AND Accounts.service = " + q(service));
        return rows;
    }

}

module.exports = Accounts;