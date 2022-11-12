import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getReactionList} from "../api";

export default function ReactionSelect({setValue, action}) {

    const [list, setList] = useState(null);

    async function populateList() {
        if (action.length < 1) {
            return;
        }
        const {data, error} = await getReactionList(action);
        if (error) {
            return console.error(error);
        }
        let i = 0;

        const reactionsElements = data.map((ar) => {
            return <option value={ar.name} key={i++}>{ar.displayName}</option>
        })

        setList(reactionsElements);

        if (data.length > 0) {
            setValue(data[0].name);
        }
    }

    const button = {
        "backgroundColor": "#5D3FD3",
        "border": "none",
        "color": "white",
        "padding": "10px 64px",
        "textAlign": "center",
        "textDecoration": "none",
        "display": "inline-block",
        "fontSize": "16px",
        "margin": "4px 2px",
        "cursor": "pointer",
        "width": "300px"
    }

    useEffect(() => {
        populateList();
    }, [action])

    return <div>
        {list && (
            <select onChange={event => {setValue(event.target.value)}} style={button}>
                {list}
            </select>
        )}
    </div>
}

ReactionSelect.propTypes = {
    setValue: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired
}