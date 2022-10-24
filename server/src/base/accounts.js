const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class Accounts extends Table {

    constructor() {
        super("CREATE TABLE if not exists Accounts (" +
            "userId INT NOT NULL," +
            "service VARCHAR(30) NOT NULL," +
            "serviceUser VARCHAR(30) NOT NULL," +
            "refresh_token VARCHAR(255) NOT NULL," +
            "access_token VARCHAR(255) NOT NULL," +
            "FOREIGN KEY (service) REFERENCES Services (name)," +
            "PRIMARY KEY (userId, service)" +
            ")");
    }

    async create(userId, service, serviceUser, refresh_token, access_token) {
        const sql = "INSERT INTO Accounts (userId, service, serviceUser, refresh_token, access_token) VALUES (" +
            q(userId) + ", " +
            q(service) + ", " +
            q(serviceUser) + ", " +
            q(refresh_token) + ", " +
            q(access_token) +
            ")";
        return this.query(sql);
    }

    async delete(userId, service) {
        const sql = "DELETE FROM Accounts WHERE " +
            "Accounts.userId = " + q(userId) +
            " AND Accounts.service = " + q(service);
        return this.query(sql);
    }

    async getUserServices(userId) {
        return this.query("Select service FROM Accounts WHERE Accounts.userId = " + q(userId));
    }

    async getUserId(service, serviceUser) {
        return this.query("Select userId FROM Accounts WHERE Accounts.service = " + q(service)
            + " AND Accounts.serviceUser = " + q(serviceUser))
    }

    async getToken(userId, service) {
        return this.query("Select serviceUser, refresh_token, access_token FROM Accounts WHERE Accounts.userId = " + q(userId) +
            " AND Accounts.service = " + q(service));
    }

}

module.exports = Accounts;