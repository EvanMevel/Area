
class Table {

    con;
    createSql;

    constructor(createSql) {
        this.createSql = createSql;
    }

    async connect(con) {
        this.con = con;
        this.con.query(this.createSql);
    }

}

module.exports = Table;