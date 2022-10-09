
const token = {
    "type": "object",
    "properties": {
        "token": {
            "type": "string",
            "description": "token used to make request on behalf of user"
        }
    }
}

const register = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "user's name"
        },
        "email": {
            "type": "string",
            "description": "user's email"
        },
        "password": {
            "type": "string",
            "description": "user's password"
        }
    },
    "example": {
        "name": "test",
        "email": "test@test.com",
        "password": "pass"
    }
}

module.exports.register = {
    "post": {
        "tags": [
            "Login"
        ],
        "description": "Register",
        "summary": "Register a new user",
        "operationId": 'register',
        "consumes":[
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Registered",
                "content": {
                    "application/json": {
                        "schema": token
                    }
                }
            }
        },
        "requestBody" : {
            "content": {
                "application/json": {
                    "schema": register
                }
            }
        }
    }
}