
const area = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "description": "id of area",
            "uniqueItems": true
        },
        "actionId": {
            "type": "string",
            "description": "id of the action"
        },
        "reactionId": {
            "type": "string",
            "description": "id of the action"
        }
    }
}

const createAREA = {
    "type": "object",
    "properties": {
        "userId": {
            "type": "integer",
            "description": "id of user",
            "uniqueItems": true
        },
        "actionId": {
            "type": "string",
            "description": "id of the action"
        },
        "reactionId": {
            "type": "string",
            "description": "id of the action"
        }
    },
    "example": {
        "userId": 1,
        "actionId": "fb_test",
        "reactionId": "fb_test_t"
    }
}

const createAnswer = {
    "type": "object",
    "properties": {
        "message": {
            "type": "string",
            "description": "message of answer"
        },
        "insertId": {
            "type": "integer",
            "description": "id of the area"
        }
    },
    "example": {
        "message": "Created AREA with success",
        "insertId": 0
    }
}

const deleteAnswer = {
    "type": "object",
    "properties": {
        "message": {
            "type": "string",
            "description": "message of answer"
        }
    },
    "example": {
        "message": "Deleted AREA with success"
    }
}

module.exports.area = {
    "post": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Create an action reaction",
        "operationId": 'post-action-reaction',
        "consumes":[
            "application/json"
        ],
        "responses": {
            "201": {
                "description": "Created",
                "content": {
                    "application/json": {
                        "schema": createAnswer
                    }
                }
            }
        },
        "requestBody" : {
            "content": {
                "application/json": {
                    "schema": createAREA
                }
            }
        }
    },
    "delete": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Delete an action reaction",
        "operationId": 'delete-action-reaction',
        "responses": {
            "200": {
                "description": "Deleted",
                "content": {
                    "application/json": {
                        "schema": deleteAnswer
                    }
                }
            }
        },
        "parameters": [
            {
                "in": "query",
                "name": "id",
                "description": "Id of area",
                "required": true,
                "schema": {
                    "type": "integer"
                }
            }
        ]
    }
}

module.exports.list = {
    "get": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Returns informations about this area project",
        "operationId": 'action-reaction-list',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "array",
                            "items": area,
                            "example": [
                                {"id":2,"actionId":"fb_test","reactionId":"fb_test_t"},
                                {"id":3,"actionId":"facebook_action_post","reactionId":"facebook_reaction_post"}
                            ]
                        }
                    }
                }
            }
        },
        "parameters": [
            {
                "in": "query",
                "name": "userId",
                "description": "Id of user",
                "required": true,
                "schema": {
                    "type": "integer"
                }
            }
        ]
    }
}