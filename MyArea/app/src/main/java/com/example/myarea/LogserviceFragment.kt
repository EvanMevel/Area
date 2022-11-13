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
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.android.volley.toolbox.ImageRequest
import com.example.myarea.databinding.FragmentLogserviceBinding


class LogserviceFragment : Fragment(){
    private var _binding: FragmentLogserviceBinding? = null
    private val binding get() = _binding!!
    lateinit var layout: LinearLayout;

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentLogserviceBinding.inflate(inflater, container, false)
        layout = binding.container;
        return binding.root
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        getRequest()
        binding.logintoip.setOnClickListener {
            findNavController().navigate(R.id.action_logserviceFragment_to_LoginFragment) // if log out button is pressed --> move to the second fragment
        }
    }

    fun getRequest() { // get resquest for the list of AREAs of the connected user
        MainActivity.server.about_area(
            { response ->
                println("GET Request : ${response}")
                var servicesArray = response.getJSONObject("server").getJSONArray("services")
                for (i in 0 until servicesArray.length()) {// dispaly a card for each area
                    var service = servicesArray.getJSONObject(i)
                    var src = service.getJSONObject("files")
                    if(service.getBoolean("oauth")){
                        var logo= MainActivity.server.baseUrl +src.getString("logo")
                        addservice(logo, service.getString("name"), service.getString("displayName"));
                    }
                }
            }, { error ->
                Toast.makeText(MainActivity.instance,"Resquest failed",Toast.LENGTH_LONG).show()
            }
        )
    }
    fun addservice(imageLogo : String, serviceName : String, displayName :String) { // add card function which add a card (card is the layer where the area name and the delete button are)
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
            val url = MainActivity.server.getAuthUrl(serviceName, null);
            val i = Intent(Intent.ACTION_VIEW)
            i.data = Uri.parse(url)
            startActivity(i)
        }
        layout.addView(view);
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}