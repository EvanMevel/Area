const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class AR extends Table {

    table;

    constructor(table) {
        super("CREATE TABLE if not exists " + table + " (" +
            "name VARCHAR(30) PRIMARY KEY," +
            "displayName VARCHAR(30) NOT NULL," +
            "description VARCHAR(70) NOT NULL," +
            "service VARCHAR(30) NOT NULL," +
            "FOREIGN KEY (service) REFERENCES Services (name)" +
            ")");
        this.table = table;
    }

    async getAll() {
        return this.query("SELECT * FROM " + this.table);
    }

    async create(name, displayName, description, service) {
        const sql = "INSERT INTO " + this.table + " (name, displayName, description, service) SELECT " +
            q(name) + ", " +
            q(displayName) + ", " +
            q(description) + ", " +
            q(service) +
            " WHERE NOT EXISTS(SELECT * FROM " + this.table + " WHERE name = " + q(name) + ")";
        return this.query(sql);
    }

    async exists(name) {
        return this.query("SELECT name FROM " + this.table +
            " WHERE " + this.table + ".name = " + q(name));
    }

}

module.exports = AR;