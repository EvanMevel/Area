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
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject


/**
 * A simple [Fragment] subclass as the default destination in the navigation.
 */
class FirstFragment : Fragment() { // fragment creation

    private var _binding: FragmentFirstBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!! //get binding

    lateinit var layout: LinearLayout; // get layout

    override fun onCreateView(
            inflater: LayoutInflater, container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentFirstBinding.inflate(inflater, container, false)
        layout = binding.container;
        //get area list
        getRequest();
        return binding.root
    }

    fun getRequest() { // get resquest for the list of AREAs of the connected user
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "$BASE_URL/api/area_list"
        val stringRequest = object:JsonArrayRequest(
            Request.Method.GET, url,null,
            { response ->
                println("GET Request : ${response}")
                for (i in 0 until response.length()) {// dispaly a card for each area
                    var element = response.getJSONObject(i);
                    addCard(element.getString("name"), element.getInt("id"));
                }
            },
            { error ->
                var str = String(error.networkResponse.data)
                var body = Json.parseToJsonElement(str)
                println(Json.encodeToString(body));
                var errortext = body.jsonObject.get("message")
                binding.TextError.setText(errortext.toString())
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
            findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment) // if add action button is pressed --> move to the second fragment
        }
        binding.deconexion.setOnClickListener {
            findNavController().navigate(R.id.action_FirstFragment_to_loginFragment) // if log out button is pressed --> move to the second fragment
        }
    }

    fun deleteRequest(id : Int, view : View) { // delete request function which delete the chosen AREA
        val queue = Volley.newRequestQueue(MainActivity.instance)
        val url = "$BASE_URL/api/area?id=" + id;
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
            override fun getHeaders(): MutableMap<String, String> { // header function which change the header of the request to put the token inside(token = user identity)
                val headers = HashMap<String, String>()
                headers["Authorization"] = "Bearer " + MainActivity.token;
                return headers
            }
        }
        queue.add(jsonObjectRequest)
    }

    fun addCard(name : String, id : Int) { // add card function which add a card (card is the layer where the area name and the delete button are)
        println(layout.allViews.joinToString())
        var view = layoutInflater.inflate(R.layout.card, null);
        var nameView = view.findViewById<TextView>(R.id.name);
        var deleteButton = view.findViewById<Button>(R.id.delete);
        binding.textviewFirst.isInvisible=true;
        nameView.setText(name);
        deleteButton.setOnClickListener { // if delete button pressed this card and the area on it will be deleted
            deleteRequest(id , view)
        }
        layout.addView(view);
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}