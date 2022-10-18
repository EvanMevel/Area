
const token = {
    "type": "object",
    "properties": {
        "token": {
            "type": "string",
            "description": "token used to make request on behalf of user"
        }
    }
}

const login = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "user's name or email"
        },
        "password": {
            "type": "string",
            "description": "user's password"
        }
    },
    "example": {
        "name": "test",
        "password": "pass"
    }
}

module.exports = {
    "post": {
        "tags": [
            "Login"
        ],
        "description": "Login",
        "summary": "login with user's credential",
        "operationId": 'login',
        "consumes":[
            "application/json"
        ],
        "responses": {
            "200": {
                "description": "Logged in",
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
                    "schema": login
                }
            }
        }
    }
}