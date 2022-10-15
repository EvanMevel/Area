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
        return this.query("SELECT * FROM ActionReactions");
    }

    async getUser(userId) {
        return this.query("SELECT id, actionId, reactionId FROM ActionReactions WHERE userId = " + userId);
    }

    async create(userId, actionId, reactionId) {
        const sql = "INSERT INTO ActionReactions (userId, actionId, reactionId) VALUES (" +
            q(userId) + ", " +
            q(actionId) + ", " +
            q(reactionId) +
            ")";
        return this.query(sql);
    }

    async delete(id, userId) {
        return this.query("DELETE FROM ActionReactions WHERE " +
            "ActionReactions.id = " + id + " AND " +
            "ActionReactions.userId = " + userId);
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
        return this.query(sql);
    }

    async hasPermission(id, userId) {
        return this.query("SELECT id FROM ActionReactions WHERE " +
            "userId = " + userId + " AND " +
            "id = " + id);
    }
}

module.exports = AREA;