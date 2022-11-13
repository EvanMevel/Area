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
        "files": {
            "type": "object",
            "properties": {
                "logo": {
                    "type": "string",
                    "description": "Url of logo",
                },
                "large": {
                    "type": "string",
                    "description": "Url of large logo",
                }
            }
        },
        "oauth": {
            "type": "boolean",
            "description": "If the service uses oauth"
        },
        "authUrl": {
            "type": "string",
            "description": "Url to authenticate"
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
                "name": "deezer",
                "displayName": "Deezer",
                "oauth": true,
                "actions": [
                    {
                        "name": "deezer_action_like",
                        "displayName": "Deezer Listen Likes",
                        "description": "Listen to user liking a track on Deezer"
                    }
                ],
                "reactions": [
                    {
                        "name": "deezer_reaction_like",
                        "displayName": "Deezer Like",
                        "description": "Likes the track on Deezer"
                    }
                ],
                "files": {
                    "logo": "/files/deezer/deezer.png",
                    "large": "/files/deezer/deezer-large.png"
                },
                "authUrl": "/auth/deezer"
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
        "summary": "Returns informations about areas",
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