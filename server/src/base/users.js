const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class Users extends Table {

    constructor() {
        super("CREATE TABLE if not exists Users (" +
            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(30) NOT NULL," +
            "email VARCHAR(30) NOT NULL," +
            "password VARCHAR(50) NOT NULL" +
            ")");
    }

    async login(name) {
        const sql = "SELECT id, password FROM `Users` WHERE name = " + q(name);
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async nameAlreadyExist(name) {
        const sql = "SELECT id FROM Users WHERE " +
            "name = " + q(name);
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async emailAlreadyExist(email) {
        const sql = "SELECT id FROM Users WHERE " +
            "email = " + q(email);
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async register(name, email, password) {
        const sql = "INSERT INTO Users (`id`, `name`, `email`, `password`) VALUES (" +
            "NULL, " +
            q(name) + ", " +
            q(email) + ", " +
            q(password) +
            ")";
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

}

module.exports = Users;