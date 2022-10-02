const objId = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "Id of item",
            "uniqueItems": true
        }
    }
};

module.exports = {
    "get": {
        "tags": [
            "Test"
        ],
        "description": "Returns test values from database",
        "operationId": 'getTest',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "array",
                            "items": objId
                        }
                    }
                }
            }
        }
    }
}