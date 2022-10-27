
const reaction = {
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

const reactions = {
    "type": "array",
    "items": reaction
}


module.exports = {
    "get": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Returns available reactions for said action",
        "summary": "Returns available reactions for said action",
        "operationId": 'reactions',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": reactions
                    }
                }
            }
        },
        "parameters": [
            {
                "in": "query",
                "name": "action",
                "description": "Id of action",
                "required": true,
                "schema": {
                    "type": "string"
                }
            }
        ]
    }
}