package com.example.myarea

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.core.view.isInvisible
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.myarea.databinding.FragmentLoginBinding
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import org.json.JSONObject

class LoginFragment : Fragment(){
    private var _binding: FragmentLoginBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        binding.login.isInvisible = true
        binding.register.isInvisible = true
        binding.imageView.isInvisible = true
        binding.TextError.isInvisible = true
        binding.logoSpotify.isInvisible = true
        binding.logoYoutube.isInvisible = true
        binding.logoDeezer.isInvisible = true
        binding.username.isInvisible = true
        binding.password.isInvisible = true
        return binding.root

    }

    fun getRequest() {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "$BASE_URL/about.json"
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                println("GET Request : ${response}")
                binding.login.isInvisible = false
                binding.register.isInvisible = false
                binding.imageView.isInvisible = false
                binding.TextError.isInvisible = false
                binding.logoSpotify.isInvisible = false
                binding.logoYoutube.isInvisible = false
                binding.logoDeezer.isInvisible = false
                binding.username.isInvisible = false
                binding.password.isInvisible = false

            },
            { error ->
                var errortext = "Connection Server Failed."
                println("AZERTGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGHR")
                binding.TextError.isInvisible = false
                binding.TextError.setText(errortext)

            })
        queue.add(stringRequest)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        getRequest()
        binding.login.setOnClickListener {
            var username = binding.username.text.toString();
            var password = binding.password.text.toString();
            val queue = Volley.newRequestQueue(MainActivity.instance)
            val url = "$BASE_URL/auth/login"
            var json = JSONObject();
            json.put("name", username);
            json.put("password", password);
            val jsonPostRequest = JsonObjectRequest(
                Request.Method.POST, url, json,
                { response ->
                    MainActivity.token = response["token"].toString();
                    println("POST Request : ${response}")
                    findNavController().navigate(R.id.action_loginFragment_to_FirstFragment)
                },
                { error ->
                    var str = String(error.networkResponse.data)
                    var body = Json.parseToJsonElement(str)
                    println(Json.encodeToString(body));
                    var errortext = body.jsonObject.get("message")
                    binding.TextError.setText(errortext.toString())
                    println(body)
                })
            queue.add(jsonPostRequest)

        }
        binding.logoSpotify.setOnClickListener {
            println("CA CLIQUE SUR SPOTYTY")
            val webIntent: Intent = Uri.parse("$BASE_URL/auth/spotify").let { webpage ->
                Intent(Intent.ACTION_VIEW, webpage)
            }
            activity?.let { it1 -> ContextCompat.startActivity(it1, webIntent, null) }
            //$BASE_URL/auth/spotify
        }
        binding.register.setOnClickListener {
            findNavController().navigate(R.id.action_loginFragment_to_RegisterFragment)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}