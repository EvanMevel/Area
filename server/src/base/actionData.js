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
        return this.query("SELECT data FROM ActionsData WHERE actionReactionId = " + areaId);
    }

    async getString(areId) {
        let data = await this.get(areId);
        if (data == null || data[0] == null) {
            return null;
        }
        const buffer = Buffer.from(data[0].data, "binary");
        return buffer.toString();
    }

    async set(areaId, data) {
        return this.query("REPLACE INTO ActionsData (actionReactionId, data) VALUES (" +
            q(areaId)  + ", " +
            q(data) +
            ")");
    }

    async delete(areaId) {
        return this.query("DELETE FROM ActionsData WHERE actionReactionId = " + areaId);
    }

}

module.exports = ActionData;