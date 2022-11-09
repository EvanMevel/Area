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
        binding.login.isInvisible = true // set login button as invisible
        binding.register.isInvisible = true // set register button as invisible
        binding.imageView.isInvisible = true // set phil picture as invisible
        binding.TextError.isInvisible = true // set red error text as invisible
        binding.logoSpotify.isInvisible = true // set logo spotify as invisible
        binding.logoYoutube.isInvisible = true // set logo youtube as invisible
        binding.logoDeezer.isInvisible = true // set logo deezer as invisible
        binding.username.isInvisible = true // set username as invisible
        binding.password.isInvisible = true // set password as invisible
        return binding.root

    }

    fun getRequest() {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "$BASE_URL/about.json"
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                println("GET Request : ${response}")
                binding.login.isInvisible = false // display all items because connection to the server works
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
                var errortext = "Connection Server Failed." // set a string to display when an error occurs
                binding.TextError.isInvisible = false // set visible the textError
                binding.TextError.setText(errortext)// print the server error

            })
        queue.add(stringRequest)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        getRequest()
        binding.login.setOnClickListener {
            var username = binding.username.text.toString() //get the username input from the user
            var password = binding.password.text.toString(); //get the password input from the user
            val queue = Volley.newRequestQueue(MainActivity.instance)
            val url = "$BASE_URL/auth/login"
            var json = JSONObject();
            json.put("name", username);
            json.put("password", password);
            val jsonPostRequest = JsonObjectRequest(
                Request.Method.POST, url, json,
                { response -> // if it works we get the token and move to the first fragment
                    MainActivity.token = response["token"].toString();
                    println("POST Request : ${response}")
                    findNavController().navigate(R.id.action_loginFragment_to_FirstFragment)
                },
                { error -> //if it doesn't work we display the seveur error message
                    var str = String(error.networkResponse.data)
                    var body = Json.parseToJsonElement(str)
                    println(Json.encodeToString(body));
                    var errortext = body.jsonObject.get("message")
                    binding.TextError.setText(errortext.toString())
                    println(body)
                })
            queue.add(jsonPostRequest)

        }

        binding.logoSpotify.setOnClickListener { // if spotify button is clicked we go on web to login on it and then go back to the app
            val webIntent: Intent = Uri.parse("$BASE_URL/auth/spotify").let { webpage ->
                Intent(Intent.ACTION_VIEW, webpage)
            }
            activity?.let { it1 -> ContextCompat.startActivity(it1, webIntent, null) }
        }

        binding.register.setOnClickListener { // if register button is pressed we move to the register fragment
            findNavController().navigate(R.id.action_loginFragment_to_RegisterFragment)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}