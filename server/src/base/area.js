const Table = require("./table");

function q(text) {
    return "'" + text + "'";
}

class AREA extends Table {

    constructor() {
        super("CREATE TABLE if not exists ActionReactions (" +
            "id INT NOT NULL PRIMARY KEY AUTO_INCREMENT," +
            "userId INT NOT NULL," +
            "actionId VARCHAR(30) NOT NULL," +
            "reactionId VARCHAR(30) NOT NULL," +
            "FOREIGN KEY (actionId) REFERENCES Actions (name)," +
            "FOREIGN KEY (reactionId) REFERENCES Reactions (name)" +
            ")");
    }

    async getAll() {
        const [rows, fields] = await this.con.query("SELECT * FROM ActionReactions");
        return rows;
    }

    async getUser(userId) {
        const [rows, fields] = await this.con.query("SELECT id, actionId, reactionId FROM ActionReactions WHERE userId = " + userId);
        return rows;
    }

    async create(userId, actionId, reactionId) {
        const sql = "INSERT INTO ActionReactions (userId, actionId, reactionId) VALUES (" +
            q(userId) + ", " +
            q(actionId) + ", " +
            q(reactionId) +
            ")";
        const [rows, fields] = await this.con.query(sql);
        return rows;
    }

    async delete(id, userId) {
        const [rows, fields] = await this.con.query("DELETE FROM ActionReactions WHERE " +
            "ActionReactions.id = " + id + " AND " +
            "ActionReactions.userId = " + userId);
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

    async hasPermission(id, userId) {
        const [rows, fields] = await this.con.query("SELECT id FROM ActionReactions WHERE " +
            "userId = " + userId + " AND " +
            "id = " + id);
        return rows;
    }
}

module.exports = AREA;