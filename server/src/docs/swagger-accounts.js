
const account = {
    "type": "object",
    "properties": {
        "service": {
            "type": "string",
            "description": "Service of the account",
            "uniqueItems": true
        }
    }
};

const accounts = {
    "type": "array",
    "items": account
}

module.exports = {
    "get": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Returns linked account of a user",
        "summary": "Returns linked account of a user",
        "operationId": 'accounts',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": accounts
                    }
                }
            }
        }
    }
}