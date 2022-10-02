'use strict';

const mysql = require('mysql2/promise');

class AreaBase {

    con;

    constructor() {

    }

    async connect() {
        this.con = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });
        console.log("Connected to " + process.env.MYSQL_DB + "!");
    }

    async createTables() {
        const services = "CREATE TABLE if not exists Services (" +
            "id VARCHAR(30) PRIMARY KEY," +
            "name VARCHAR(30)" +
            ")";
        this.con.query(services);
        const actions = "CREATE TABLE if not exists Actions (" +
            "id VARCHAR(30) PRIMARY KEY," +
            "name VARCHAR(30)," +
            "description VARCHAR(30)," +
            "service VARCHAR(30)," +
            "FOREIGN KEY (service) REFERENCES Services (id)" +
            ") DEFAULT CHARSET = latin1";
        this.con.query(actions);
        const reactions = "CREATE TABLE if not exists Reactions (" +
            "id VARCHAR(30) PRIMARY KEY," +
            "name VARCHAR(30)," +
            "description VARCHAR(30)," +
            "service VARCHAR(30)," +
            "FOREIGN KEY (service) REFERENCES Services (id)" +
            ") DEFAULT CHARSET = latin1";
        this.con.query(reactions);
    }

    stop() {
        if (this.con != null) {
            this.con.end();
        }
        console.log("Disconnected to " + process.env.MYSQL_DB + "!");
    }

    async getTest() {
        let response = await this.con.query("SELECT * FROM test");
        return response[0];
    }
}

module.exports = AreaBase;