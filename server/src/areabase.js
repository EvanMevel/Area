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
            "name VARCHAR(30) PRIMARY KEY," +
            "displayName VARCHAR(30) NOT NULL," +
            "oauth BOOLEAN NOT NULL" +
            ")";
        this.con.query(services);
        const elements = "(" +
            "name VARCHAR(30) PRIMARY KEY," +
            "displayName VARCHAR(30) NOT NULL," +
            "description VARCHAR(70) NOT NULL," +
            "service VARCHAR(30) NOT NULL," +
            "FOREIGN KEY (service) REFERENCES Services (name)" +
            ")";
        const actions = "CREATE TABLE if not exists Actions " +
            elements;
        this.con.query(actions);
        const reactions = "CREATE TABLE if not exists Reactions " +
            elements;
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

    async getServices() {
        const [rows, fields] = await this.con.query("SELECT * FROM Services");
        return rows;
    }

    async getActions() {
        const [rows, fields] = await this.con.query("SELECT * FROM Actions");
        return rows;
    }

    async getReactions() {
        const [rows, fields] = await this.con.query("SELECT * FROM Reactions");
        return rows;
    }
}

module.exports = AreaBase;