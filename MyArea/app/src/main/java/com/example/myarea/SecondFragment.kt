package com.example.myarea

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.core.view.isInvisible
import androidx.navigation.fragment.findNavController
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.myarea.databinding.FragmentSecondBinding

/**
 * A simple [Fragment] subclass as the second destination in the navigation.
 */
class SecondFragment : Fragment(), AdapterView.OnItemSelectedListener {

    private var _binding: FragmentSecondBinding? = null
    private var lastResponse : String = "";
    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    lateinit var actionSpinner : Spinner;
    lateinit var reactionSpinner : Spinner;
    lateinit var vue : View;

    lateinit var actionAdapter : ArrayAdapter<String>;
    lateinit var reactionAdapter : ArrayAdapter<String>;

    lateinit var services: Services;

    fun getRequest() {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "http://10.0.2.2:8080/about.json"
        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                //
                println("GET Request : ${response}")
                lastResponse = response;
                myParse(lastResponse);
            },
            { println( "That didn't work!" )})
        queue.add(stringRequest)
    }

    fun postRequest() {
        var desAction = actionSpinner.selectedItem.toString().split("-")[1].trim();
        var desReaction = reactionSpinner.selectedItem.toString().split("-")[1].trim();
        var idAction = services.getActionId(desAction)
        var idReaction = services.getActionId(desReaction)

        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "http://10.0.2.2:8080/api/action-reaction"
        var map = Map<String, Object>();
        map.put("actionId", idAction);
        map.put("reactionId", idReaction);
        map.put("userId", 1);
        var json = JSONObject(map);
        val stringRequest = JsonRequest(
            Request.Method.POST, url, json,
            { response ->
                //
                println("GET Request : ${response}")
                lastResponse = response;
                myParse(lastResponse);
            },
            { println( "That didn't work!" )})
        queue.add(stringRequest)
        
    }

    fun myParse(string: String) {
        services = Services(string);

        actionAdapter.addAll(services.getServiceAction());
        actionSpinner.setAdapter(actionAdapter);
        actionSpinner.isInvisible = false;

        reactionAdapter.addAll(services.getServiceReaction());
        reactionSpinner.setAdapter(reactionAdapter);
        reactionSpinner.isInvisible = false;
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

        actionSpinner = view.findViewById(R.id.spinner);
        actionAdapter = ArrayAdapter<String>(view.context, android.R.layout.simple_spinner_item, arrayListOf());
        actionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        actionSpinner.isInvisible = true;


        reactionSpinner = view.findViewById(R.id.action);
        reactionAdapter = ArrayAdapter<String>(view.context, android.R.layout.simple_spinner_item, arrayListOf());
        reactionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        reactionSpinner.isInvisible = true;

        binding.buttonSecond.setOnClickListener {
            postRequest()
            findNavController().navigate(R.id.action_SecondFragment_to_FirstFragment)
        }
        getRequest()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
    }

    override fun onNothingSelected(p0: AdapterView<*>?) {

    }
}