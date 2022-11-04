package com.example.myarea

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.view.allViews
import androidx.core.view.isInvisible
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.myarea.databinding.FragmentFirstBinding


/**
 * A simple [Fragment] subclass as the default destination in the navigation.
 */
class FirstFragment : Fragment() {

    private var _binding: FragmentFirstBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    lateinit var layout: LinearLayout;

    override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentFirstBinding.inflate(inflater, container, false)
        layout = binding.container;
        //get area list
        getRequest();
        //display  return
        return binding.root
    }

    fun getRequest() {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "http://10.0.2.2:8080/api/area_list"
        val stringRequest = object:JsonArrayRequest(
            Request.Method.GET, url,null,
            { response ->
                println("GET Request : ${response}")
                for (i in 0 until response.length()) {
                    var element = response.getJSONObject(i);
                    addCard(element.getString("name"), element.getInt("id"));
                }
            },
            { error ->
                var body: String = String(error.networkResponse.data);
                println(body)
            })
        {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                headers["Authorization"] = "Bearer " + MainActivity.token;
                return headers
            }
        }
        queue.add(stringRequest)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.addaction.setOnClickListener {
            findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment)
        }
        binding.deconexion.setOnClickListener {
            findNavController().navigate(R.id.action_FirstFragment_to_loginFragment)
        }
    }

    fun deleteRequest(id : Int, view : View) {
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "http://10.0.2.2:8080/api/area?id=" + id;
        val jsonObjectRequest = object: JsonObjectRequest(
            Request.Method.DELETE, url, null,
            { response ->
                println("GET Request : ${response}")

                if (layout.childCount == 1) {
                    layout.removeAllViews();
                } else {
                    layout.removeView(view)
                }
            },
            { error ->
                var body: String = String(error.networkResponse.data);
                println(body)
            })
        {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                headers["Authorization"] = "Bearer " + MainActivity.token;
                return headers
            }
        }
        queue.add(jsonObjectRequest)
    }

    fun addCard(name : String, id : Int) {
        println(layout.allViews.joinToString())
        var view = layoutInflater.inflate(R.layout.card, null);
        var nameView = view.findViewById<TextView>(R.id.name);
        var deleteButton = view.findViewById<Button>(R.id.delete);
        binding.textviewFirst.isInvisible=true;
        nameView.setText(name);
        deleteButton.setOnClickListener {
            deleteRequest(id , view)
        }
        layout.addView(view);
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}