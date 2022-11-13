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
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.android.volley.toolbox.ImageRequest
import com.example.myarea.databinding.FragmentServiceregisterBinding


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
                                addservice(logo, service.getString("name"),loggedServices.contains(service.getString("name")));
                            }
                        }
                    },binding.TextError
                )
            }, { error ->
                println("error")
            }
        )
    }

    fun addservice(imageLogo : String, serviceName : String, isLog : Boolean) { // add card function which add a card (card is the layer where the area name and the delete button are)
        var view = layoutInflater.inflate(R.layout.servicesbutton, null);
        var nameView = view.findViewById<TextView>(R.id.name);
        var logo = view.findViewById<ImageView>(R.id.logo);
        var service = view.findViewById<androidx.cardview.widget.CardView>(R.id.card)
        var imageRequest = ImageRequest(imageLogo,
            { response ->
                logo.setImageBitmap(response)
            }, 100, 100, ImageView.ScaleType.CENTER_CROP, null,
            { error ->
                println("ERROREUH")
            })
        MainActivity.server.queue.add(imageRequest)
        nameView.setText(serviceName);
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
                    println("ERROREUH")
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