import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getActionList} from "../api";

export default function ActionSelect({setValue}) {

    const [list, setList] = useState(null);

    async function populateList() {
        const {data, error} = await getActionList();
        if (error) {
            return console.error(error);
        }
        let i = 0;

        const actionsElements = data.map((ar) => {
            return <option value={ar.name} key={i++}>{ar.displayName}</option>
        })

        setList(actionsElements);

        if (data.length > 0) {
            setValue(data[0].name);
        }
    }

    const button = {
        "background-color": "#5D3FD3",
        "border": "none",
        "color": "white",
        "padding": "10px 64px",
        "text-align": "center",
        "text-decoration": "none",
        "display": "inline-block",
        "font-size": "16px",
        "margin": "4px 2px",
        "cursor": "pointer"
    }

    useEffect(() => {
        populateList();
    }, [])

    return <div>
        {list && (
            <select onChange={event => {setValue(event.target.value)}} style={button}>
                {list}
            </select>
        )}
    </div>
}

ActionSelect.propTypes = {
    setValue: PropTypes.func.isRequired
}