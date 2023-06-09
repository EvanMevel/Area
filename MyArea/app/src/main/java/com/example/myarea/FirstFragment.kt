package com.example.myarea

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.view.isInvisible
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.myarea.databinding.FragmentFirstBinding


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
        MainActivity.server.area_list(
            { response ->
                println("GET Request : ${response}")
                for (i in 0 until response.length()) {// dispaly a card for each area
                    var element = response.getJSONObject(i);
                    addCard(element.getString("name"), element.getInt("id"));
                }
            }, binding.TextError
        )
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.addaction.setOnClickListener {
            findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment) // if add action button is pressed --> move to the second fragment
        }
        binding.service.setOnClickListener {
            findNavController().navigate(R.id.action_FirstFragment_to_ServiceregisterFragment) // if add action button is pressed --> move to the second fragment
        }
        binding.deconexion.setOnClickListener {
            MainActivity.server.setToken(null);
            MainActivity.server.confirmToken();

            findNavController().navigate(R.id.action_FirstFragment_to_loginFragment) // if log out button is pressed --> move to the second fragment
        }
    }

    fun deleteRequest(id : Int, view : View) { // delete request function which delete the chosen AREA
        MainActivity.server.delete_area(id,
            { response ->
                println("GET Request : ${response}")
                if (layout.childCount == 1) {
                    layout.removeAllViews();
                    binding.textviewFirst.isInvisible=false
                } else {
                    layout.removeView(view)
                }
            }, binding.TextError
        );
    }

    fun addCard(name : String, id : Int) { // add card function which add a card (card is the layer where the area name and the delete button are)
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