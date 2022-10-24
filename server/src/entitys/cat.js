var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Cat",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
    }
})