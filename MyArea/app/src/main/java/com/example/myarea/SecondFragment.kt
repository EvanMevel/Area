package com.example.myarea

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.core.view.get
import androidx.core.view.isInvisible
import androidx.navigation.fragment.findNavController
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.myarea.databinding.FragmentSecondBinding
import kotlinx.serialization.json.*

/**
 * A simple [Fragment] subclass as the second destination in the navigation.
 */
class SecondFragment : Fragment(), AdapterView.OnItemSelectedListener {

    private var _binding: FragmentSecondBinding? = null
    private var lastResponse : String = "";
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    lateinit var spinner : Spinner;
    lateinit var actionSpinner : Spinner;
    lateinit var vue : View;

    lateinit var adapter : ArrayAdapter<String>;
    lateinit var actionAdapter : ArrayAdapter<String>;

    lateinit var services: Services;
    lateinit var actionServices: Services;
    lateinit var reactionServices: Services;

    fun getRequest(): String {
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
                myParse(lastResponse);
            },
            { println( "That didn't work!" )})
// Add the request to the RequestQueue.
        queue.add(stringRequest)
        return "tg"
    }

    fun myParse(string: String) {
        /*var response = Json.parseToJsonElement(string);
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
            println("ma liste :" + serviceNameList[i]);
            adapter.add(serviceNameList[i]);
        }
        for (i in 0 until adapter.count) {
            println("adapter : " + adapter.getItem(i))
        }*/
        services = Services(string);
        adapter.addAll(services.getServicesNames());
        spinner.setAdapter(adapter);
        spinner.isInvisible = false;
    }

    override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentSecondBinding.inflate(inflater, container, false)
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        vue = view;
        spinner = view.findViewById(R.id.spinner);
        adapter = ArrayAdapter<String>(view.context, android.R.layout.simple_spinner_item, arrayListOf());
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setOnItemSelectedListener(this);
        spinner.isInvisible = true;

        binding.buttonSecond.setOnClickListener {
            findNavController().navigate(R.id.action_SecondFragment_to_FirstFragment)
        }
        getRequest()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
        var service = spinner.selectedItem;
        var serviceAction = services.getServiceAction(
            service as String
        );
        println(serviceAction)

        actionSpinner = view!!.findViewById(R.id.action);
        actionAdapter = ArrayAdapter<String>(view!!.context, android.R.layout.simple_spinner_item, serviceAction);
        actionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        actionSpinner.setAdapter(actionAdapter);
    }

    override fun onNothingSelected(p0: AdapterView<*>?) {

    }
}