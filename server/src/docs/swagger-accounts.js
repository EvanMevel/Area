
const account = {
    "type": "object",
    "properties": {
        "service": {
            "type": "string",
            "description": "Service of the account"
        },
        "token": {
            "type": "string",
            "description": "Token of the account"
        }
    }
}

const createAnswer = {
    "type": "object",
    "properties": {
        "message": {
            "type": "string",
            "description": "message of answer"
        }
    },
    "example": {
        "message": "Created account with success"
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
        "message": "Deleted account with success"
    }
}

module.exports = {
    "get": {
        "tags": [
            "Accounts"
        ],
        "summary": "Returns the list of all accounts of a user",
        "description": "Returns the list of all accounts of a user",
        "operationId": 'accounts-list',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "array",
                            "items": account,
                            "example": [
                                {"service":"spotify","token":"example"},
                                {"service":"facebook","token":"example2"}
                            ]
                        }
                    }
                }
            }
        }
    },
    "post": {
        "tags": [
            "Accounts"
        ],
        "description": "Create an account",
        "summary": "Create an account",
        "operationId": 'accounts-create',
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
                    "schema": account
                }
            }
        }
    },
    "delete": {
        "tags": [
            "Accounts"
        ],
        "description": "Delete an account",
        "summary": "Delete an account",
        "operationId": 'account-delete',
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
                "name": "service",
                "description": "service of account",
                "required": true,
                "schema": {
                    "type": "string"
                }
            }
        ]
    }
}