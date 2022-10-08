'use strict';

const mysql = require('mysql2/promise');

function q(text) {
    return "'" + text + "'";
}

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
            "name VARCHAR(30) NOT NULL PRIMARY KEY," +
            "displayName VARCHAR(30) NOT NULL," +
            "oauth BOOLEAN NOT NULL" +
            ")";
        this.con.query(services);

        const users = "CREATE TABLE if not exists Users (" +
            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(30) NOT NULL," +
            "email VARCHAR(30) NOT NULL," +
            "password VARCHAR(50) NOT NULL" +
            ")";
        this.con.query(users);

        const tokens = "CREATE TABLE if not exists Tokens (" +
            "token VARCHAR(30) NOT NULL PRIMARY KEY, " +
            "userId INT NOT NULL, " +
            "expire INT UNSIGNED NOT NULL, " +
            "FOREIGN KEY (userId) REFERENCES Users (id)" +
            ")";
        this.con.query(tokens);

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

        const actionReaction = "CREATE TABLE if not exists ActionReactions (" +
            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
            "userId INT NOT NULL," +
            "actionId VARCHAR(30) NOT NULL," +
            "reactionId VARCHAR(30) NOT NULL," +
            "FOREIGN KEY (actionId) REFERENCES Actions (name)," +
            "FOREIGN KEY (reactionId) REFERENCES Reactions (name)" +
            ")";
        this.con.query(actionReaction);

        const actionData = "CREATE TABLE if not exists ActionsData (" +
            "actionReactionId INT NOT NULL PRIMARY KEY," +
            "data BLOB," +
            "FOREIGN KEY (actionReactionId) REFERENCES ActionReactions (id)" +
            ")";
        this.con.query(actionData);
    }

    stop() {
        if (this.con != null) {
            this.con.end();
        }
        console.log("Disconnected to " + process.env.MYSQL_DB + "!");
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

    async getActionReactions() {
        const [rows, fields] = await this.con.query("SELECT * FROM ActionReactions");
        return rows;
    }

    async getUserActionReactions(userId) {
        const [rows, fields] = await this.con.query("SELECT * FROM ActionReactions WHERE userId = " + userId);
        return rows;
    }

    async createActionReaction(area) {
        const sql = "INSERT INTO ActionReactions (userId, actionId, reactionId) VALUES (" +
            q(area.userId) + ", " +
            q(area.actionId) + ", " +
            q(area.reactionId) +
            ")";
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async editActionReaction(area) {
        let sql = "UPDATE ActionReactions SET ";
        if (area.actionId != null) {
            sql += "actionId = " + q(area.actionId);
        }
        if (area.reactionId != null) {
            if (area.actionId != null) {
                sql += ", ";
            }
            sql += "reactionId = " + q(area.reactionId);
        }
        sql += " WHERE ActionReactions.id = " + area.id;
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async removeAREA(id) {
        const [rows, fields] = await this.con.query("DELETE FROM ActionReactions WHERE ActionReactions.id = " + id);
        return rows;
    }

    async getActionData(areId) {
        const [rows, fields] = await this.con.query("SELECT data FROM ActionsData WHERE actionReactionId = " + areId);
        return rows;
    }

    async setActionData(areId, data) {
        const [rows, fields] = await this.con.query("REPLACE INTO ActionsData (actionReactionId, data) VALUES " +
            "(" + areId  + ", " + data + ")");
        return rows;
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

module.exports = AreaBase;