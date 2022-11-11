package com.example.myarea

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.myarea.databinding.FragmentIpconfigBinding

class IpconfigFragment() : Fragment() {
    private var _binding: FragmentIpconfigBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!! //get binding

    lateinit var layout: LinearLayout; // get layout

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentIpconfigBinding.inflate(inflater, container, false)
        return binding.root
    }

    fun getRequest() { // get resquest for the list of AREAs of the connected user
        var ip = binding.ipserveur.text.toString();
        if (!ip.isBlank()) {
            MainActivity.server.setUrl(ip);
        }
        MainActivity.server.about_area(
            { response ->
                println("GET Request : ${response}")
                findNavController().navigate(R.id.action_IpconfigFragment_to_LoginFragment);
            },{ error ->
                println(error);
                binding.TextError.setText("Invalid IP - impossible connection")
            }
        )
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.ipbutton.setOnClickListener {
            getRequest()

        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}