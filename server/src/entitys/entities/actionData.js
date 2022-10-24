const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "ActionData",
    tableName: "ActionData",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        data: {
            type: "blob"
        }
    },
    relations: {
        area: {
            target: "ActionReactions",
            type: "many-to-one",
            nullable: false
        }
    }
})