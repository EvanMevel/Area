package com.example.myarea

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.myarea.databinding.FragmentLoginBinding
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
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.login.setOnClickListener {
            var username = binding.username.text.toString();
            var password = binding.password.text.toString();
            val queue = Volley.newRequestQueue(MainActivity.instance)
            val url = "http://10.0.2.2:8080/auth/login"
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
                { println( "That didn't work!" )})
            queue.add(jsonPostRequest)

        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}