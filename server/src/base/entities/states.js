const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "States",
    tableName: "States",
    columns: {
        state: {
            primary: true,
            type: "varchar"
        },
        callback: {
            type: "varchar"
        },
        userId: {
            type: "int"
        }
    }
})