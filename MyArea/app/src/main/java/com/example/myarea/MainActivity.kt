package com.example.myarea

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.ui.AppBarConfiguration
import com.example.myarea.databinding.ActivityMainBinding
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
                    }else if (response.has("message")){
                        var message = response.getString("message")
                        Toast.makeText(MainActivity.instance,message,Toast.LENGTH_LONG).show()
                    }
                },
                { error ->
                    var str = String(error.networkResponse.data)
                    var body = Json.parseToJsonElement(str)
                    var errortext = body.jsonObject.get("message")
                    Toast.makeText(MainActivity.instance,errortext.toString(),Toast.LENGTH_LONG).show()
                    println(body)
                }
            )
        }

    }

}