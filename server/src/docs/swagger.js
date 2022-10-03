//https://levelup.gitconnected.com/the-simplest-way-to-add-swagger-to-a-node-js-project-c2a4aa895a3c
//https://levelup.gitconnected.com/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce

const test = require("./swagger-test.js");

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
            "name": "Test",
            "description": "Test category"
        }
    ],
    "paths": {
        "/api/test": test
    }
}