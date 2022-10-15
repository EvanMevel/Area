
const Services = require("./services");
const AR = require("./ar");
const AREA = require("./area");
const ActionData = require("./actionData");
const Users = require("./users");
const Accounts = require("./accounts");

class Base {

    con;
    users = new Users();
    services = new Services();
    actions = new AR("Actions");
    reactions = new AR("Reactions");
    area = new AREA();
    actionData = new ActionData();
    accounts = new Accounts();

    constructor() {
    }

    async connect() {
        console.log("[BASE] Loading base...");
        const mysql = require("mysql2/promise");
        this.con = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });
        console.log("[BASE] Connected to " + process.env.MYSQL_DB + "!");

        await this.users.connect(this.con);
        await this.services.connect(this.con);
        await this.actions.connect(this.con);
        await this.reactions.connect(this.con);
        await this.area.connect(this.con);
        await this.actionData.connect(this.con);
        await this.accounts.connect(this.con);

        console.log("[BASE] Loaded all tables!");
    }

    stop() {
        if (this.con != null) {
            this.con.end();
        }
        console.log("[BASE] Disconnected to " + process.env.MYSQL_DB + "!");
    }

}

module.exports = Base;