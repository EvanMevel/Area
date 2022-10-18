
class Table {

    con;
    createSql;

    constructor(createSql) {
        this.createSql = createSql;
    }

    async connect(con) {
        this.con = con;
        return this.con.query(this.createSql);
    }

    async query(req) {
        const [rows] = await this.con.query(req);
        return rows;
    }

}

module.exports = Table;