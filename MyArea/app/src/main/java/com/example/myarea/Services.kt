package com.example.myarea

import kotlinx.serialization.json.*

class Services {

    var services : MutableList<JsonObject> = arrayListOf();
    var actions : MutableList<JsonObject> = arrayListOf();
    var reactions : MutableList<JsonObject> = arrayListOf();

    constructor(string: String) {
        val response = Json.parseToJsonElement(string);
        val server = response.jsonObject.get("server");
        val srvs = server?.jsonObject?.get("services")?.jsonArray;


        for (i in 0 until srvs?.size!!) {
            services.add(srvs.get(i).jsonObject);
            var service = services.get(i).jsonObject;
            var displayAction = service.get("actions")?.jsonArray
            for (j in 0 until displayAction!!.size) {
                var action = displayAction.get(j).jsonObject;
                actions.add(action)
            }
            var displayReaction = service.get("reactions")?.jsonArray
            for (j in 0 until displayReaction!!.size) {
                var reaction = displayReaction.get(j).jsonObject;
                reactions.add(reaction)
            }
        }

    }

    fun getActionId(currentDescription : String) : String {
        for (i in 0 until actions.size) {
            var action = actions.get(i)
            var description = action.get("description")!!.jsonPrimitive.toString()
            if ( description == currentDescription){
                return (action.get("name")!!.jsonPrimitive.toString())
            }
        }
        return "ERROR"
    }

    fun getReactionId(currentDescription : String) : String {
        for (i in 0 until reactions.size) {
            var reaction = reactions.get(i)
            var description = reaction.get("description")!!.jsonPrimitive.toString()
            if ( description == currentDescription){
                return (reaction.get("name")!!.jsonPrimitive.toString())
            }
        }
        return "ERROR"
    }

    fun getServicesNames() : MutableList<String> {
        var servicesNames : MutableList<String> = arrayListOf();

        for (i in 0 until services.size) {
            var service = services.get(i).jsonObject;
            var displayName = service.get("displayName")?.jsonPrimitive.toString()
            servicesNames.add(displayName);
        }
        return servicesNames;
    }

    fun getServiceAction() : MutableList<String> {
        var serviceAction : MutableList<String> = arrayListOf();

        for (i in 0 until services.size) {
            var service = services.get(i).jsonObject;
            var displayName = service.get("displayName")?.jsonPrimitive.toString()
            var displayAction = service.get("actions")?.jsonArray
            for (j in 0 until displayAction!!.size) {
                var action = displayAction.get(j).jsonObject;
                var description = action.get("description")?.jsonPrimitive.toString()
                serviceAction.add(displayName + " - " + description)
            }
        }
        return serviceAction;
    }

    fun getServiceReaction() : MutableList<String> {
        var serviceReaction : MutableList<String> = arrayListOf();

        for (i in 0 until services.size) {
            var service = services.get(i).jsonObject;
            println(service)
            var displayName = service.get("displayName")?.jsonPrimitive.toString()
            println(displayName)
            var displayReaction = service.get("reactions")?.jsonArray
            for (j in 0 until displayReaction!!.size) {
                var reaction = displayReaction.get(j).jsonObject;
                var description = reaction.get("description")?.jsonPrimitive.toString()
                println(description)
                serviceReaction.add(displayName + " - " + description)
            }
        }
        return serviceReaction;
    }

}