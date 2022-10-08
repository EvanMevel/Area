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
        const [rows, fields] = await this.con.query("SELECT * FROM " + this.table);
        return rows;
    }

    async create(name, displayName, description, service) {
        const sql = "INSERT INTO " + this.table + " (name, displayName, description, service) SELECT " +
            q(name) + ", " +
            q(displayName) + ", " +
            q(description) + ", " +
            q(service) +
            " WHERE NOT EXISTS(SELECT * FROM " + this.table + " WHERE name = " + q(name) + ")";
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async exists(name) {
        const [rows, fields] = await this.con.query("SELECT name FROM " + this.table +
            " WHERE " + this.table + ".name = " + q(name));
        return rows;
    }

}

module.exports = AR;