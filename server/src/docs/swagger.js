//https://levelup.gitconnected.com/the-simplest-way-to-add-swagger-to-a-node-js-project-c2a4aa895a3c
//https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce

const about = require("./swagger-about");
const area = require("./swagger-area");
const login = require("./login");
const register = require("./register");

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
        }
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
        "/api/login": login.login,
        "/api/register": register.register,
        "/api/area_list": area.list,
        "/api/area": area.area
    },
    "security": [ { "Bearer": [] } ]
}