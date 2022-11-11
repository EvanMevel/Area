package com.example.myarea

import android.widget.TextView
import com.android.volley.Request
import com.android.volley.Response.ErrorListener
import com.android.volley.Response.Listener
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import org.json.JSONArray
import org.json.JSONObject


class Server {

    var baseUrl: String = "http://10.0.2.2:8080"

    fun setUrl(url: String) {
        if (url.startsWith("http")) {
            baseUrl = url;
        } else {
            baseUrl = "http://$url";
        }
    }

    fun about_area(success: Listener<JSONObject>, er :ErrorListener)
    {
        println("$baseUrl/about.json");
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val jsonArrayRequest = JsonObjectRequest(
            Request.Method.GET, "$baseUrl/about.json", null,
            success,
            er);
        queue.add(jsonArrayRequest)
    }

    fun register_area(json : JSONObject, success: Listener<JSONObject>, textError: TextView) {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val jsonPostRequest = JsonObjectRequest(
            Request.Method.POST, "$baseUrl/auth/register", json,
            success,
            errorhandling(textError))
        queue.add(jsonPostRequest)
    }

    fun login_area(json : JSONObject, success: Listener<JSONObject>, textError: TextView) {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val jsonPostRequest = JsonObjectRequest(
            Request.Method.POST, "$baseUrl/auth/login", json,
            success,
            errorhandling(textError))
        queue.add(jsonPostRequest)
    }

    fun actions(success: Listener<JSONArray>, textError: TextView) {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val jsonArrayRequest = object: JsonArrayRequest(
            Method.GET, "$baseUrl/api/actions", null,
            success,
            errorhandling(textError))
        {
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }
        queue.add(jsonArrayRequest)
    }

    fun reactions(action: String, success: Listener<JSONArray>, textError: TextView) {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val jsonArrayRequest = object: JsonArrayRequest(
            Method.GET, "$baseUrl/api/reactions?action=$action", null,
            success,
            errorhandling(textError))
        {
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }
        queue.add(jsonArrayRequest)
    }

    fun createArea(action: String, reaction: String, name: String, success: Listener<JSONObject>, textError: TextView) {
        val queue = Volley.newRequestQueue(MainActivity.instance)

        var json = JSONObject();
        json.put("actionId", action);
        json.put("reactionId", reaction);
        json.put("name", name);

        val jsonPostRequest = object: JsonObjectRequest(
            Request.Method.POST, "$BASE_URL/api/area", json,
            success,
            errorhandling(textError))
        {
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }
        queue.add(jsonPostRequest)
    }

    fun area_list(success: Listener<JSONArray>, textError: TextView) {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val jsonPostRequest = object: JsonArrayRequest(
            Method.GET, "$baseUrl/api/area_list", null,
            success,
            errorhandling(textError))
        {
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }
        queue.add(jsonPostRequest)
    }

    fun delete_area(id : Int, success: Listener<JSONObject>, textError: TextView) {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val jsonPostRequest = object: JsonObjectRequest(
            Method.DELETE, "$baseUrl/api/area?id=$id", null,
            success,
            errorhandling(textError))
        {
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }
        queue.add(jsonPostRequest)
    }

    fun errorhandling(textError: TextView) : ErrorListener {
        return ErrorListener { error ->
            var str = String(error.networkResponse.data)
            var body = Json.parseToJsonElement(str)
            println(Json.encodeToString(body));
            var errortext = body.jsonObject.get("message")
            textError.setText(errortext.toString())
            println(body)
        }
    }

    fun serverHeaders(): MutableMap<String, String> {
        val headers = HashMap<String, String>()
        headers["Authorization"] = "Bearer " + MainActivity.token;
        return headers
    }
}