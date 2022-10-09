const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class ActionData extends Table {

    constructor() {
        super("CREATE TABLE if not exists ActionsData (" +
            "actionReactionId INT NOT NULL PRIMARY KEY," +
            "data BLOB," +
            "FOREIGN KEY (actionReactionId) REFERENCES ActionReactions (id)" +
            ")");
    }

    async get(areaId) {
        const [rows, fields] = await this.con.query("SELECT data FROM ActionsData WHERE actionReactionId = " + areaId);
        return rows;
    }

    async getString(areId) {
        let data = await this.get(areId);
        if (data == null || data[0] == null) {
            return null;
        }
        var buffer = Buffer.from(data[0].data, "binary");
        return buffer.toString();
    }

    async set(areaId, data) {
        const [rows, fields] = await this.con.query("REPLACE INTO ActionsData (actionReactionId, data) VALUES (" +
            q(areaId)  + ", " +
            q(data) +
            ")");
        return rows;
    }
}

module.exports = ActionData;