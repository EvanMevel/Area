import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {getActionList} from "../api";

export default function ActionSelect({setValue}) {

    const [list, setList] = useState(null);

    async function populateList() {
        try {
            const givenList = await getActionList();
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
    }, [])

    return <div>
        {list && (
            <select onChange={event => {setValue(event.target.value)}}>
                {list}
            </select>
        )}
    </div>
}

ActionSelect.propTypes = {
    setValue: PropTypes.func.isRequired
}