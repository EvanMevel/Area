const ConnectServices = require("./connectServices");
const app_secret = "7966df434097d4c9ceaa3053f9d1590e";
const app_id = "562402";
const redirect_uri = "http://localhost:8080/api/services/callback/deezer";


class DeezerService extends ConnectServices {

    async loginRedirect(userId, server, res) {
        var scope = 'basic_access,email,offline_access,manage_library,manage_community,delete_library,listening_history';
        const data = {
            app_id: app_id,
            perms: scope,
            redirect_uri: redirect_uri + "?userid=" + userId
        }
        const searchParams = new URLSearchParams(data)
        res.redirect('https://connect.deezer.com/oauth/auth.php?' + searchParams.toString());
    }

    async callback(req, res, server) {
        const code = req.query.code;
        const userId = req.query.userid;
        console.log(userId)
        const data = {
            app_id: app_id,
            secret: app_secret,
            code: code
        }
        const searchParams = new URLSearchParams(data)
        const body = await server.request.post("https://connect.deezer.com/oauth/access_token.php?" + searchParams);
        const access_token = body.body.substring(body.body.indexOf('=') + 1, body.body.indexOf('&'));
        server.base.accounts.create(userId, "deezer", access_token);
        res.send("coucou");
    }
}
module.exports = new DeezerService();