const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Accounts",
    tableName: "Accounts",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        serviceUser: {
            type: "varchar"
        },
        refreshToken: {
            type: "varchar"
        },
        accessToken: {
            type: "varchar"
        }
    },
    relations: {
        user: {
            target: "Users",
            type: "many-to-one",
            nullable: false
        },
        service: {
            target: "Services",
            type: "many-to-one",
            nullable: false
        }
    }
})