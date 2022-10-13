# AREA

# Backend

## Scripts

**start.bat**: start all docker containers\
**stop.bat**: stop all docker containers\
**log-back.bat**: show logs from backend server\
**backend.bat**: start cli in docker backend server

## Doc

You can see API doc by starting the server and going to the url http://localhost:8080/api-docs/



### How to create an Action

__*In your file, add :*__

_At the beginning :_

```nodejs
const Action = require("./action");
```

_At the end :_

```nodejs
class ACTION_NAME extends Action {
    constructor(areaId, userId) {
        super(areaId, userId);
    }
    
    async events(areabase) {
        // Return here the array of string you want to send to Reaction
        }
}

module.exports = ACTION_NAME
```

__*In the actionList.js file, add :*__

_At the beginning :_

```nodejs
const ACTION_NAME = require("./ACTION_FILENAME");
```
_In the constructor :_

```nodejs
this.add(ACTION_NAME, "ACTION_ID", "ACTION_NAME", "ACTION_DESC", "SERVICE");
```

### How to create a Reaction

__*In your file, add :*__

_At the beginning :_

```nodejs
const Reaction = require("./reaction");
```

_At the end :_

```nodejs
class REACTION_NAME extends REACTION {
    constructor(areaId, userId) {
        super(areaId, userId);
    }
    
    async ingest(event, areabase) {
        // Execute the reaction, you can use 'event' that is the string given by the action
        }
}

module.exports = REACTION_NAME
```

__*In the reactionList.js file, add :*__

_At the beginning :_

```nodejs
const REACTION_NAME = require("./REACTION_FILENAME");
```

_In the constructor :_

```nodejs
this.add(REACTION_NAME, "REACTION_ID", "REACTION_NAME", "REACTION_DESC", "SERVICE");
```

**How to create a new service**

__*In the services.js file :*__

_Add in registerServices :_

```nodejs
await areabase.services.create("SERVICE_ID", "SERVICE_NAME", SERVICE_OAUTH_LVL);
```

## Database

Database is accessible with phpmyadmin at http://localhost:8081