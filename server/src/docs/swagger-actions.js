
const action = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the reaction",
            "uniqueItems": true
        },
        "displayName": {
            "type": "string",
            "description": "display name of the reaction",
            "uniqueItems": true
        },
        "description": {
            "type": "string",
            "description": "Description of the reaction",
            "uniqueItems": true
        }
    }
};

const actions = {
    "type": "array",
    "items": action
}


module.exports = {
    "get": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Returns available actions for user",
        "summary": "Returns available actions for user",
        "operationId": 'actions',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": actions
                    }
                }
            }
        }
    }
}