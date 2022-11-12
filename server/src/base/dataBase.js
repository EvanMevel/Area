
console.log("[BASE] Loading base...");
const typeorm = require("typeorm");

let dataSource = new typeorm.DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || null,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    entities: [require("./entities/users"), require("./entities/services"),
        require("./entities/accounts"),
        require("./entities/reactions"), require("./entities/actions"), require("./entities/area"),
        require("./entities/actionData"),
        require("./entities/states")]
})

class DataBase {
    services;
    users;
    accounts;
    reactions;
    actions;
    area;
    actionData;
    states;

    constructor() {
    }

    async initialize() {
        await dataSource.initialize();
        console.log("[BASE] Connected to " + process.env.MYSQL_DATABASE + "!");

        this.services = dataSource.getRepository("Services");
        this.users = dataSource.getRepository("Users");
        this.accounts = dataSource.getRepository("Accounts");
        this.actions = dataSource.getRepository("Actions");
        this.reactions = dataSource.getRepository("Reactions");
        this.area = dataSource.getRepository("ActionReactions");
        this.actionData = dataSource.getRepository("ActionData");
        this.states = dataSource.getRepository("States");
    }

    async stop() {
        return dataSource.destroy();
    }

}

module.exports = DataBase;