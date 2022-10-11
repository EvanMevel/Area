package com.example.myarea

import kotlinx.serialization.json.*

class Services {

    var services : MutableList<JsonObject> = arrayListOf();

    constructor(string: String) {
        val response = Json.parseToJsonElement(string);
        val server = response.jsonObject.get("server");
        val srvs = server?.jsonObject?.get("services")?.jsonArray;

        for (i in 0 until srvs?.size!!) {
            services.add(srvs.get(i).jsonObject);
        }
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

    fun getServiceAction(serviceName : String) : MutableList<String> {
        var serviceAction : MutableList<String> = arrayListOf();

        for (i in 0 until services.size) {
            var service = services.get(i).jsonObject;
            var displayName = service.get("displayName")?.jsonPrimitive.toString()
            println("displayName: " + displayName);
            if (displayName == serviceName) {
                println("serviceName: " + serviceName);
                var displayAction = service.get("actions")?.jsonArray
                println(displayAction);
                for (j in 0 until displayAction!!.size) {
                    var action = displayAction.get(j).jsonObject;
                    var description = action.get("description")?.jsonPrimitive.toString()
                    serviceAction.add(description)
                }
                return serviceAction;
            }
        }
        return serviceAction;
    }

    fun getServiceReaction(serviceName : String) : MutableList<String> {
        var serviceReaction : MutableList<String> = arrayListOf();

        for (i in 0 until services.size) {
            var service = services.get(i).jsonObject;
            var displayName = service.get("displayName")?.jsonPrimitive.toString()
            if (displayName == serviceName) {
                var displayRection = service.get("reactions")?.jsonArray
                for (i in 0 until displayRection!!.size) {
                    var action = displayRection.get(i).jsonObject;
                    var description = action.get("description")?.jsonPrimitive.toString()
                    serviceReaction.add((description))
                }
            }
        }
        return serviceReaction;
    }

}