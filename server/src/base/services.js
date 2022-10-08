const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class Services extends Table {

    constructor() {
        super("CREATE TABLE if not exists Services (" +
            "name VARCHAR(30) PRIMARY KEY," +
            "displayName VARCHAR(30) NOT NULL," +
            "oauth BOOLEAN NOT NULL" +
            ")");
    }

    async getAllServices() {
        const [rows, fields] = await this.con.query("SELECT * FROM Services");
        return rows;
    }

    async create(name, displayName, oauth) {
        const sql = "INSERT INTO Services (name, displayName, oauth) SELECT " +
            q(name) + ", " +
            q(displayName) + ", " +
            q(oauth) +
            " WHERE NOT EXISTS(SELECT * FROM Services WHERE name = " + q(name) + ")";
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }
}

module.exports = Services;