'use strict';

const express = require('express');
const mysql = require('mysql');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

let con = null;
let server = null;

async function closeGracefully(signal) {
    console.log("Stopping server...");
    if (con != null) {
        con.end();
    }
    if (server != null) {
        server.close();
    }
}

process.on('SIGTERM', closeGracefully);
process.on('SIGINT', closeGracefully);

// App
const app = express();
app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log("Received from the ip " + ip);

    const sql = "SELECT * FROM test";
    con.query(sql, function (err, result) {
        if (err) throw err;
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            arr[i] = {id: result[i].id};
        }
        res.send(arr);
    });

});

server = app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});

con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});
