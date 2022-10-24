console.log("1")
const typeorm = require("typeorm")
console.log("2")

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "test",
    synchronize: true,
    entities: [require("./entities/users"), require("./entities/services"),
        require("./entities/accounts"),
        require("./entities/reactions"), require("./entities/actions"), require("./entities/area"),
        require("./entities/actionData")],
})
console.log("3")

async function bootstrap() {
    console.log("hi");
    await dataSource.initialize();
    console.log("init");
}

bootstrap();