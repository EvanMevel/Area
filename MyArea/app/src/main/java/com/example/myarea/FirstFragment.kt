package com.example.myarea

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.myarea.databinding.FragmentFirstBinding
import kotlinx.serialization.json.*

/**
 * A simple [Fragment] subclass as the default destination in the navigation.
 */
class FirstFragment : Fragment(), OnItemSelectedListener {
    private var lastResponse : String = "";

    private var _binding: FragmentFirstBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!


    fun getRequest(){
        // Instantiate the RequestQueue.
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "http://10.0.2.2:8080/about.json"

// Request a string response from the provided URL.
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                //
                println("GET Request : ${response}")
                lastResponse = response;
                MyParse(lastResponse);
            },
            { println( "That didn't work!" )})

// Add the request to the RequestQueue.
        queue.add(stringRequest)
    }

    fun MyParse(string: String) {
        var response = Json.parseToJsonElement(string);
        var server = response.jsonObject.get("server");
        var time = server?.jsonObject?.get("current_time");
        var services = server?.jsonObject?.get("services")?.jsonArray;
        var serList : List<JsonObject> = listOf();
        var serviceList = serList.toMutableList();
        var serNameList : List<String> = listOf();
        var serviceNameList = serNameList.toMutableList();
            for (i in 0 until services?.size!!) {
            var service = services.get(i).jsonObject;
            serviceList.add(service);
            var displayName = serviceList[i].get("displayName")?.jsonPrimitive.toString()
                serviceNameList.add(displayName);
        }

        for (i in 0 until serviceNameList.size) {
            println("ma liste :" + serviceNameList[i])
        }
    }

    override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentFirstBinding.inflate(inflater, container, false)
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.buttonFirst.setOnClickListener {
            findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment)
            Log.d("TAG", "tbleubleublue ca me parait etre un bon quoi feur")

        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
        println("AHHEIUZIUEBIZA");
    }

    override fun onNothingSelected(p0: AdapterView<*>?) {
        println("EJOZIABE IUZAB PE A");
    }
}