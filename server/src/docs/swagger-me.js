
const me = {
    "type": "object",
    "properties": {
        "id": {
            "type": "int",
            "description": "Id of the user"
        },
        "name": {
            "type": "string",
            "description": "Name of the user"
        },
        "email": {
            "type": "string",
            "description": "email of the user"
        }
    }
};

module.exports = {
    "get": {
        "tags": [
            "Info"
        ],
        "description": "Returns information of logged in user",
        "summary": "Returns information of logged in user",
        "operationId": 'me',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": me
                    }
                }
            }
        }
    }
}