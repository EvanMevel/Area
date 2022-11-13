package com.example.myarea

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.ui.AppBarConfiguration
import com.example.myarea.databinding.ActivityMainBinding
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject

class MainActivity : AppCompatActivity() {

    companion object {
        lateinit var instance: MainActivity
        lateinit var server: Server
    }
    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        instance = this
        server = Server(this);

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)

        val data = intent.data;

        if (data != null) {
            val service = data.pathSegments.get(data.pathSegments.size - 1);
            val query = data.query
            server.calledBack(service, query!!,
                { response ->
                    println(response.toString())
                    if (response.has("token")) {
                        server.setToken(response.getString("token"));
                        server.confirmToken();
                        server.oauthCallback.countDown();
                    }
                },
                { error ->
                    var str = String(error.networkResponse.data)
                    var body = Json.parseToJsonElement(str)
                    println(Json.encodeToString(body));
                    var errortext = body.jsonObject.get("message")
                    println(errortext)
                    println(body)
                }
            )
        }

    }

}