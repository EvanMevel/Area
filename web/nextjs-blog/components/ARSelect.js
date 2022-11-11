import React, {useEffect, useImperativeHandle, useState} from "react";
import PropTypes from "prop-types";

export default function ARSelect({getValue, setValue, updateList}) {

    const [list, setList] = useState(null);

    async function populateList(list) {
        try {
            console.log(JSON.stringify(list));
            const actionsElements = list.map((ar) => {
                return <option value={ar.name}>{ar.displayName}</option>
            })

            setList(actionsElements);

            if ((getValue() == null || getValue().length < 1) && list.length > 0) {
                setValue(list[0].name);
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (updateList != null) {
        updateList.call = populateList;
    }

    return <div>
        {list && (
            <select onChange={event => {
                setValue(event.target.value);
            }}>
                {list}
            </select>
        )}
    </div>
}

ARSelect.propTypes = {
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    updateList: PropTypes.object
}