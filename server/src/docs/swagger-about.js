const action = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the action",
            "uniqueItems": true
        },
        "description": {
            "type": "string",
            "description": "Description of the action",
            "uniqueItems": true
        }
    }
};

const reaction = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the reaction",
            "uniqueItems": true
        },
        "description": {
            "type": "string",
            "description": "Description of the reaction",
            "uniqueItems": true
        }
    }
};

const service = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the service",
            "uniqueItems": true
        },
        "actions": {
            "type": "array",
            "items": action
        },
        "reactions": {
            "type": "array",
            "items": reaction
        },
        "oauth": {
            "type": "boolean"
        }
    }
};

const server = {
    "type": "object",
    "properties": {
        "services": {
            "type": "array",
            "items": service
        }
    }
}

const client = {
    "type": "object",
    "properties": {
        "host": {
            "type": "string",
            "description": "IP address of the client performing the HTTP request"
        }
    }
}

const about = {
    "type": "object",
    "properties": {
        "client": client,
        "server": server
    },
    "example": {
        "client": {
            "host": "127.0.0.1"
        },
        "server": {
            "current_time": 1005454151,
            "services": [{
                "name": "facebook",
                "displayName": "Facebook",
                "oauth": 1,
                "actions": [{
                    "name": "facebook_action_post",
                    "displayName": "Facebook listen post",
                    "description": "Listen when a user make a post on facebook"
                }],
                "reactions":[{
                    "name": "facebook_reaction_post",
                    "displayName": "Facebook post post",
                    "description": "Post a Facebook post"
                }]
            }]
        }
    }
}

module.exports = {
    "get": {
        "tags": [
            "Info"
        ],
        "description": "Returns informations about this area project",
        "operationId": 'about.json',
        "responses": {
            "200": {
                "description": "OK",
                "content": {
                    "application/json": {
                        "schema": about
                    }
                }
            }
        }
    }
}