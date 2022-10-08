
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
        "actionId": "fb_test",
        "reactionId": "fb_test_t"
    }
}

const modifyAREA = {
    "type": "object",
    "properties": {
        "id": {
            "type": "id",
            "description": "id of the area"
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
        "id": 1,
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
        "summary": "Create an action reaction",
        "operationId": 'area-create',
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
    "put": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Modify an action reaction",
        "summary": "Modify an action reaction",
        "operationId": 'area-modify',
        "consumes":[
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Modified",
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
                    "schema": modifyAREA
                }
            }
        }
    },
    "delete": {
        "tags": [
            "ActionReaction"
        ],
        "description": "Delete an action reaction",
        "summary": "Delete an action reaction",
        "operationId": 'area-delete',
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
        "summary": "Returns the list of all area of a user",
        "description": "Returns the list of all area of a user",
        "operationId": 'area-list',
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
        }
    }
}