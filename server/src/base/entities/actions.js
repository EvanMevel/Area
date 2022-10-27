const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Actions",
    tableName: "Actions",
    columns: {
        name: {
            primary: true,
            type: "varchar"
        },
        displayName: {
            type: "varchar"
        },
        description: {
            type: "varchar"
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