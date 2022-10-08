
const mysql = require("mysql2/promise");
const Services = require("./services");
const AR = require("./ar");
const AREA = require("./area");
const ActionData = require("./actionData");

class Base {

    con;
    services = new Services();
    actions = new AR("Actions");
    reactions = new AR("Reactions");
    area = new AREA();
    actionData = new ActionData();

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

        await this.services.connect(this.con);
        await this.actions.connect(this.con);
        await this.reactions.connect(this.con);
        await this.area.connect(this.con);
        await this.actionData.connect(this.con);

        console.log("Loaded all tables!");
    }

    stop() {
        if (this.con != null) {
            this.con.end();
        }
        console.log("Disconnected to " + process.env.MYSQL_DB + "!");
    }

}

module.exports = Base;