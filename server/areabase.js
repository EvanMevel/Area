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