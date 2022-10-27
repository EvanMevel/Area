const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Services",
    tableName: "Services",
    columns: {
        name: {
            primary: true,
            type: "varchar"
        },
        displayName: {
            type: "varchar"
        },
        oauth: {
            type: "boolean"
        }
    }
})