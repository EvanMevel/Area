const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Reactions",
    tableName: "Reactions",
    columns: {
        name: {
            primary: true,
            type: "varchar"
        },
        displayName: {
            type: "varchar"
        },
        description: {
            type: "boolean"
        }
    },
    relations: {
        service: {
            target: "Services",
            type: "many-to-one",
            nullable: false
        },
    },
})