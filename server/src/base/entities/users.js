const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Users",
    tableName: "Users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        }
    }
})