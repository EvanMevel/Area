package com.example.myarea

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.ui.AppBarConfiguration
import com.example.myarea.databinding.ActivityMainBinding

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
    }

}