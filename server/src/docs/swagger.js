//https://levelup.gitconnected.com/the-simplest-way-to-add-swagger-to-a-node-js-project-c2a4aa895a3c
//https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce

const about = require("./swagger-about");
const area = require("./swagger-area");
const login = require("./swagger-login");
const register = require("./swagger-register");
//const accounts = require("./swagger-accounts");
const reactions = require("./swagger-reactions");

module.exports = {
    "openapi": "3.0.3",
    "info": {
        "title": "Phil Backend API",
        "description": "Documentation of Phil Backend API",
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:8080",
            "description": "Phil Backend Server"
        }
    ],
    "tags": [
        {
            "name": "Info",
            "description": "Info"
        },
        {
            "name": "Login",
            "description": "Login"
        },
        {
            "name": "ActionReaction",
            "description": "Action Reaction"
        }/*,
        {
            "name": "Accounts",
            "description": "Accounts"
        }*/
    ],
    "components": {
        "securitySchemes": {
            "Bearer": {
                "type": "http",
                "description": "JWT access token",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        },
    },
    "paths": {
        "/about.json": about,
        "/api/login": login,
        "/api/register": register,
        "/api/area_list": area.list,
        "/api/reactions": reactions,
        //"/api/accounts": accounts,
        "/api/area": area.area
    },
    "security": [ { "Bearer": [] } ]
}