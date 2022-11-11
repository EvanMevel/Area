import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getReactionList} from "../api";

export default function ReactionSelect({setValue, action}) {

    const [list, setList] = useState(null);

    async function populateList() {
        if (action.length < 1) {
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const givenList = await getReactionList(token, action);
            let i = 0;

            const actionsElements = givenList.map((ar) => {
                return <option value={ar.name} key={i++}>{ar.displayName}</option>
            })

            setList(actionsElements);

            if (givenList.length > 0) {
                setValue(givenList[0].name);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        populateList();
    }, [action])

    return <div>
        {list && (
            <select onChange={event => {setValue(event.target.value)}}>
                {list}
            </select>
        )}
    </div>
}

ReactionSelect.propTypes = {
    setValue: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired
}