const ConnectServices = require("./connectServices");
const appid = 'eab7cdc09f6346bbacd253f46f157a9b';
const redirect_uri = "http://localhost:8080/api/services/callback/spotify";
const clientSecret = "3ee4d175c21a444998315efed44f3677";

class SpotifyService extends ConnectServices {

    async loginRedirect(userId, server, res) {
        const scope = 'user-read-playback-state user-read-currently-playing playlist-read-collaborative playlist-read-private user-library-read user-top-read user-read-recently-played user-read-playback-position user-follow-read\n';

        const data = {
            response_type: 'code',
            client_id: appid,
            scope: scope,
            state: userId,
            redirect_uri: redirect_uri
        }

        const searchParams = new URLSearchParams(data);
        res.redirect('https://accounts.spotify.com/authorize?' + searchParams.toString());
    }

    async callback(req, res, server) {
        const code = req.query.code;
        const userId = req.query.state;
        console.log(userId);
        console.log(code);
        let authOptions = {
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(appid + ':' + clientSecret).toString('base64'))
            }
        };
        let body = await server.request.post("https://accounts.spotify.com/api/token", authOptions).json();
        try {
            console.log(JSON.stringify(body));
        } catch(error) {
            console.log(error.response.body);
        }
        server.base.accounts.create(userId, "spotify", body.refresh_token)
        res.send("ahaha");
    }
}

module.exports = new SpotifyService();