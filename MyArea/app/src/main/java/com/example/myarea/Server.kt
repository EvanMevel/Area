package com.example.myarea

import android.content.Context
import android.content.SharedPreferences
import android.widget.TextView
import com.android.volley.Request
import com.android.volley.RequestQueue
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
import java.net.URLEncoder
import java.nio.charset.StandardCharsets
import java.util.concurrent.CountDownLatch


class Server(main: MainActivity) {

    private val SETTING_URL = "AREA_URL";
    private val SETTING_TOK = "AREA_TOKEN";
    var baseUrl: String = "http://10.0.2.2:8080"
    var queue: RequestQueue;
    private val settings: SharedPreferences
    private val editor: SharedPreferences.Editor
    private var token: String? = null
    var oauthCallback: CountDownLatch = CountDownLatch(1)

    init {
        queue = Volley.newRequestQueue(main)
        settings = main.getPreferences(Context.MODE_PRIVATE)
        editor = settings.edit()
        val value = settings.getString(SETTING_URL, null);
        if (value != null) {
            setUrl(value);
        }
        val tok = settings.getString(SETTING_TOK, null);
        if (tok != null) {
            setToken(tok);
        }
    }

    fun resetUrl() {
        setUrl(null)
        confirmUrl()
    }

    fun confirmUrl() {
        editor.putString(SETTING_URL, baseUrl)
        editor.commit()
    }

    fun confirmToken() {
        editor.putString(SETTING_TOK, token)
        editor.commit()
    }

    fun setToken(tok: String?) {
        token = tok;
    }

    fun hasToken(): Boolean {
        return token != null;
    }

    fun setUrl(url: String?) {
        if (url == null ){
            baseUrl = "http://localhost"
            return
        }
        if (url.startsWith("http")) {
            baseUrl = url;
        } else {
            baseUrl = "http://$url";
        }
    }

    private fun postObject(url: String, json : JSONObject, success: Listener<JSONObject>, textError: TextView)
    {
        val jsonPostRequest = object: JsonObjectRequest(
            Method.POST, "$baseUrl/$url", json,
            success,
            errorhandling(textError))
        {
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }
        queue.add(jsonPostRequest)
    }

    private fun getArray(url: String, success: Listener<JSONArray>, textError: TextView)
    {
        val jsonArrayRequest = object: JsonArrayRequest(
            Method.GET, "$baseUrl/$url", null,
            success,
            errorhandling(textError))
        {
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }
        queue.add(jsonArrayRequest)
    }

    fun about_area(success: Listener<JSONObject>, er :ErrorListener)
    {
        val jsonArrayRequest = JsonObjectRequest(
            Request.Method.GET, "$baseUrl/about.json", null,
            success,
            er);
        queue.add(jsonArrayRequest)
    }

    fun me_area(success: Listener<JSONObject>, er :ErrorListener)
    {
        val jsonArrayRequest = object :JsonObjectRequest(
            Request.Method.GET, "$baseUrl/api/me", null,
            success,
            er){
            override fun getHeaders(): MutableMap<String, String> {
                return serverHeaders()
            }
        }

        queue.add(jsonArrayRequest)
    }

    fun register_area(json : JSONObject, success: Listener<JSONObject>, textError: TextView) {
        postObject("auth/register", json, success, textError);
    }

    fun login_area(json : JSONObject, success: Listener<JSONObject>, textError: TextView) {
        postObject("auth/login", json, success, textError);
    }

    fun actions(success: Listener<JSONArray>, textError: TextView) {
        getArray("api/actions", success, textError)
    }

    fun reactions(action: String, success: Listener<JSONArray>, textError: TextView) {
        getArray("api/reactions?action=$action", success, textError);
    }

    fun accounts(success: Listener<JSONArray>, textError: TextView) {
        getArray("api/accounts", success, textError)
    }

    fun createArea(action: String, reaction: String, name: String, success: Listener<JSONObject>, textError: TextView) {
        val json = JSONObject();
        json.put("actionId", action);
        json.put("reactionId", reaction);
        json.put("name", name);

        postObject("api/area", json, success, textError);
    }

    fun area_list(success: Listener<JSONArray>, textError: TextView) {
        getArray("api/area_list", success, textError);
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

    fun getAuthUrl(service: String, userId: String?) : String {
        var url = "$baseUrl/auth/$service?callback=" + URLEncoder.encode("https://groupaphil.com/callback/$service", StandardCharsets.UTF_8.name());

        if (userId != null) {
            url +=  "&userId=$userId"
        }
        return url
    }

    fun calledBack(service: String, query: String, success: Listener<JSONObject>, er :ErrorListener) {
        val jsonGetRequest = JsonObjectRequest(
            Request.Method.GET, "$baseUrl/auth/$service/callback?$query", null,
            success,
            er);
        queue.add(jsonGetRequest)
    }

    fun errorhandling(textError: TextView) : ErrorListener {
        return ErrorListener { error ->
            if (error.networkResponse == null) {
                textError.setText("Server not able to respond")
                println("ERROR")
            }else {
                var str = String(error.networkResponse.data)
                var body = Json.parseToJsonElement(str)
                println(Json.encodeToString(body));
                var errortext = body.jsonObject.get("message")
                textError.setText(errortext.toString())
                println(body)
            }
        }
    }

    fun serverHeaders(): MutableMap<String, String> {
        val headers = HashMap<String, String>()
        if (hasToken()) {
            headers["Authorization"] = "Bearer $token";
        }
        return headers
    }
}