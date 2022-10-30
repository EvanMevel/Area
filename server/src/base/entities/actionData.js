const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "ActionData",
    tableName: "ActionData",
    columns: {
        id: {
            type: "int",
            primary: true
        },
        data: {
            type: "blob"
        }
    }
})