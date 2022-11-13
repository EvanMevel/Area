package com.example.myarea

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.core.view.isInvisible
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
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

    var actionIds: HashMap<Int, String> = HashMap();
    var reactionIds: HashMap<Int, String> = HashMap();

    fun postRequest() {
        var idAction = actionIds.getValue(actionSpinner.selectedItemPosition)
        var idReaction = reactionIds.getValue(reactionSpinner.selectedItemPosition)
        var areaname = binding.areaname.text.toString();

        MainActivity.server.createArea(idAction, idReaction, areaname,
            { response ->
                println("POST Request : ${response}")
                findNavController().navigate(R.id.action_SecondFragment_to_FirstFragment)
            }, binding.TextError
        );
    }

    fun populateActions() {
        MainActivity.server.actions(
            { response ->
                var serviceAction : MutableList<String> = arrayListOf();
                actionIds.clear();

                for (i in 0 until response.length()) {
                    var action = response.getJSONObject(i);
                    actionIds.put(i, action.getString("name"));
                    serviceAction.add(action.getString("serviceName") + " - " + action.getString("description"))
                }
                actionAdapter.addAll(serviceAction);
                actionSpinner.setAdapter(actionAdapter);
                actionSpinner.isInvisible = false;
            }, binding.TextError
        );
    }

    fun populateReactions(action: String) {
        MainActivity.server.reactions(action,
            { response ->
                var serviceReaction : MutableList<String> = arrayListOf();
                reactionIds.clear();

                for (i in 0 until response.length()) {
                    var reaction = response.getJSONObject(i);
                    reactionIds.put(i, reaction.getString("name"));
                    serviceReaction.add(reaction.getString("serviceName") +
                            " - " + reaction.getString("description"))
                }
                reactionAdapter.clear();
                reactionAdapter.addAll(serviceReaction);
                reactionSpinner.setAdapter(reactionAdapter);
                reactionSpinner.isInvisible = false;
            }, binding.TextError
        );
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

        actionSpinner = view.findViewById(R.id.action);
        actionAdapter = ArrayAdapter<String>(view.context, android.R.layout.simple_spinner_item, arrayListOf());
        actionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        actionSpinner.isInvisible = true;
        actionSpinner.onItemSelectedListener = this;

        reactionSpinner = view.findViewById(R.id.reaction);
        reactionAdapter = ArrayAdapter<String>(view.context, android.R.layout.simple_spinner_item, arrayListOf());
        reactionAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        reactionSpinner.isInvisible = true;

        binding.buttonSecond.setOnClickListener {
            postRequest()
        }
        binding.annuler.setOnClickListener {
            findNavController().navigate(R.id.action_SecondFragment_to_FirstFragment)
        }
        populateActions();
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
        var actionId = actionIds.get(p2);
        if (actionId != null) {
            populateReactions(actionId)
        };
    }

    override fun onNothingSelected(p0: AdapterView<*>?) {

    }
}