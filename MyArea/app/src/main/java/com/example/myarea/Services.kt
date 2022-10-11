package com.example.myarea

import kotlinx.serialization.json.*

class Services {

    var services : MutableList<JsonObject> = arrayListOf();

    constructor(string: String) {
        val response = Json.parseToJsonElement(string);
        val server = response.jsonObject.get("server");
        val srvs = server?.jsonObject?.get("services")?.jsonArray;

        for (i in 0 until srvs?.size!!) {
            services.add(services.get(i).jsonObject);
        }
    }

    fun getServicesName() : MutableList<String> {
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
            var action = services.get(i).jsonObject;
            var displayAction = action.get("displayName")?.jsonPrimitive.toString()
            serviceAction.add(displayAction);
        }
        return serviceAction;
    }

    fun getServiceReaction() : MutableList<String> {
        var serviceReaction : MutableList<String> = arrayListOf();

        for (i in 0 until services.size) {
            var reaction = services.get(i).jsonObject;
            var displayReaction = reaction.get("displayName")?.jsonPrimitive.toString()
            serviceReaction.add(displayReaction);
        }
        return serviceReaction;
    }

}