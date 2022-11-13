package com.example.myarea

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.myarea.databinding.FragmentRegisterBinding
import org.json.JSONObject

class RegisterFragment : Fragment() {
    private var _binding: FragmentRegisterBinding? = null
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentRegisterBinding.inflate(inflater, container, false)
        //binding.register.TextError.isInvisible = true;
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.back.setOnClickListener {
            findNavController().navigate(R.id.action_registerFragment_to_LoginFragment)
        }
        binding.register.setOnClickListener {
            var username = binding.username.text.toString();
            var password = binding.password.text.toString();
            var email = binding.email.text.toString();
            var json = JSONObject();
            json.put("name", username);
            json.put("email", email);
            json.put("password", password);
            MainActivity.server.register_area(
                json,
                { response ->
                    MainActivity.server.setToken(response["token"].toString())
                    MainActivity.server.confirmToken()
                    println("POST Request : ${response}")
                    findNavController().navigate(R.id.action_registerFragment_to_LoginFragment)
                },
                binding.TextError
            )
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}