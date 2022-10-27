
let fs = require("fs");

const root = process.cwd() + "/files/";

function registerFolder(files, dir)
{
    let file = fs.readdirSync(root + dir);

    for (let fi of file) {
        files.get("/" + dir + "/" + fi, function (req, res) {
            res.sendFile(root + dir + "/" + fi)
        });
    }
}

function registerFilesRoutes(app, express)
{
    const files = express.Router();

    let dirs = fs.readdirSync(root);

    for (let dir of dirs) {
        registerFolder(files, dir);
    }

    app.use("/files", files);
}

module.exports = registerFilesRoutes;