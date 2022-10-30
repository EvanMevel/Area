const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "ActionReactions",
    tableName: "ActionReactions",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    },
    relations: {
        user: {
            target: "Users",
            type: "many-to-one",
            nullable: false
        },
        action: {
            target: "Actions",
            type: "many-to-one",
            nullable: false
        },
        reaction: {
            target: "Reactions",
            type: "many-to-one",
            nullable: false
        },
    },
})