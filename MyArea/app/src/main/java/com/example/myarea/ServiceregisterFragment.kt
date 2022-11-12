package com.example.myarea

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
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

        //get about
        getRequest()
        //parse about get service with oauth = 1
        // get in this specific service files = logo
        var imageLogo = "http://10.0.2.2:8080/files/spotify/spotify.png"
        binding.logintoip.setOnClickListener {
            findNavController().navigate(R.id.action_ServideregisterFragment_to_FirstFragment) // if add action button is pressed --> move to the second fragment
        }
    }

    fun getRequest() { // get resquest for the list of AREAs of the connected user
        MainActivity.server.about_area(
            { response ->
                println("GET Request : ${response}")
                var servicesArray = response.getJSONObject("server").getJSONArray("services")
                for (i in 0 until servicesArray.length()) {// dispaly a card for each area
                    var service = servicesArray.getJSONObject(i)
                    if(service.getBoolean("oauth")){
                        addservice("http://10.0.2.2:8080/files/spotify/spotify.png", service.getString("name"), true);//remplacer le truc pas get
                    }
                }
            }, { error ->
                println("error")
            }
        )
    }
    fun addservice(imageLogo : String, serviceName : String, isLog : Boolean) { // add card function which add a card (card is the layer where the area name and the delete button are)
        var view = layoutInflater.inflate(R.layout.servicesbutton, null);
        var nameView = view.findViewById<TextView>(R.id.name);
        var logo = view.findViewById<ImageView>(R.id.logo);
        var bgcolor = view.findViewById<androidx.cardview.widget.CardView>(R.id.card)
        //var couleur background
        println("ouiiiiiiiiiii")
        var imageRequest = ImageRequest(imageLogo,
            { response ->
                logo.setImageBitmap(response)
            }, 100, 100, ImageView.ScaleType.CENTER_CROP, null,
            { error ->
                println("ERROREUH")
            })
        MainActivity.server.queue.add(imageRequest)
        nameView.setText(serviceName);


        if (isLog == true){
           // bgcolor.setBackgroundColor()
        }
        else {
            //
        }
        layout.addView(view);
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}