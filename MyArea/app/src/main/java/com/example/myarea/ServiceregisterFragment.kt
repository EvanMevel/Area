package com.example.myarea

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.android.volley.toolbox.ImageRequest
import com.example.myarea.databinding.FragmentServiceregisterBinding
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject


class ServiceregisterFragment : Fragment(){
    private var _binding: FragmentServiceregisterBinding? = null
    private val binding get() = _binding!!
    lateinit var layout: LinearLayout;

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentServiceregisterBinding.inflate(inflater, container, false)
        layout = binding.container;
        return binding.root
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        getRequest()
        binding.logintoip.setOnClickListener {
            findNavController().navigate(R.id.action_ServideregisterFragment_to_FirstFragment) // if add action button is pressed --> move to the second fragment
        }
        binding.textView.setOnClickListener {
            val url = "https://discord.gg/GxPf9ZXuXW";
            val i = Intent(Intent.ACTION_VIEW)
            i.data = Uri.parse(url)
            startActivity(i)
        }
    }

    fun getRequest() { // get resquest for the list of AREAs of the connected user
        MainActivity.server.about_area(
            { response ->
                println("GET Request : ${response}")
                var servicesArray = response.getJSONObject("server").getJSONArray("services")
                MainActivity.server.accounts(
                    { account ->
                        var loggedServices = ArrayList<String>()
                        for (i in 0 until account.length()) {
                            loggedServices.add(account.getJSONObject(i).getString("service"))
                        }
                        for (i in 0 until servicesArray.length()) {// dispaly a card for each area
                            var service = servicesArray.getJSONObject(i)
                            var src = service.getJSONObject("files")
                            if(service.getBoolean("oauth")){
                                var logo= MainActivity.server.baseUrl + src.getString("logo")
                                addservice(logo, service.getString("name"),loggedServices.contains(service.getString("name")) , service.getString("displayName"));
                            }
                        }
                    },binding.TextError
                )
            }, { error ->
                Toast.makeText(MainActivity.instance,"Resquest failed", Toast.LENGTH_LONG).show()
            }
        )
    }

    fun addservice(imageLogo : String, serviceName : String, isLog : Boolean, displayName :String) { // add card function which add a card (card is the layer where the area name and the delete button are)
        var view = layoutInflater.inflate(R.layout.servicesbutton, null);
        var nameView = view.findViewById<TextView>(R.id.name);
        var logo = view.findViewById<ImageView>(R.id.logo);
        var service = view.findViewById<androidx.cardview.widget.CardView>(R.id.card)
        var imageRequest = ImageRequest(imageLogo,
            { response ->
                logo.setImageBitmap(response)
            }, 100, 100, ImageView.ScaleType.CENTER_CROP, null,
            { error ->
                Toast.makeText(MainActivity.instance,"Failed to load logo of :"+ displayName, Toast.LENGTH_LONG).show()
            })
        MainActivity.server.queue.add(imageRequest)
        nameView.setText(displayName);
        service.setOnClickListener {
            MainActivity.server.me_area(
                { me ->
                    var userId = me.getInt("id").toString()
                    println("USER ID :" + userId)
                    val url = MainActivity.server.getAuthUrl(serviceName, userId);
                    val i = Intent(Intent.ACTION_VIEW)
                    i.data = Uri.parse(url)
                    startActivity(i)
                },
                { er ->
                    var str = String(er.networkResponse.data)
                    var body = Json.parseToJsonElement(str)
                    var errortext = body.jsonObject.get("message")
                    Toast.makeText(MainActivity.instance,errortext.toString(),Toast.LENGTH_LONG).show()
                    println(body)
                })


        }
        if (isLog == true){
           service.setBackgroundColor(ContextCompat.getColor(context!!, R.color.purple_500))
        }else {
            service.setBackgroundColor(ContextCompat.getColor(context!!, R.color.grey))
        }
        layout.addView(view);
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}