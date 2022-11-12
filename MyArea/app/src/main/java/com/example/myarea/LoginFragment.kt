package com.example.myarea

import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.myarea.databinding.FragmentLoginBinding
import org.json.JSONObject

class LoginFragment : Fragment() {

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
            var username = binding.username.text.toString() //get the username input from the user
            var password = binding.password.text.toString(); //get the password input from the user
            var json = JSONObject();
            json.put("name", username);
            json.put("password", password);
            MainActivity.server.login_area(
                json,
                { response -> // if it works we get the token and move to the first fragment
                    MainActivity.server.setToken(response["token"].toString())
                    MainActivity.server.confirmToken()
                    println("POST Request : ${response}")
                    findNavController().navigate(R.id.action_loginFragment_to_FirstFragment)
                },
                binding.TextError)
        }

        binding.logoSpotify.setOnClickListener { // if spotify button is clicked we go on web to login on it and then go back to the app
           /* val webIntent: Intent = Uri.parse("$BASE_URL/auth/spotify").let { webpage ->
                Intent(Intent.ACTION_VIEW, webpage)
            }
            activity?.let { it1 -> ContextCompat.startActivity(it1, webIntent, null) }*/
        }

        binding.register.setOnClickListener { // if register button is pressed we move to the register fragment
            findNavController().navigate(R.id.action_loginFragment_to_RegisterFragment)
        }
    }

    override fun onResume() {
        super.onResume()

        val uri: Uri? = activity!!.intent.getData()

        println("Uri: " + uri);
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}