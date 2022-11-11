import React, {useEffect, useState} from "react";
import ActionSelect from "./ActionSelect";
import ReactionSelect from "./ReactionSelect";
import PropTypes from "prop-types";

export default function AreaEditor({setArea}) {
    const [action, setAction] = useState("");
    const [reaction, setReaction] = useState(null);
    const [name, setName] = useState();

    useEffect(() => {
        setArea({
            action,
            reaction,
            name
        })
    }, [action, reaction, name])

    return <div id="create-area">
        <ActionSelect setValue={setAction}/>
        <ReactionSelect setValue={setReaction} action={action}/>
        <input type="text" name="name" placeholder="Area name" onChange={event => setName(event.target.value)}/>
    </div>

}

AreaEditor.propTypes = {
    setArea: PropTypes.func.isRequired,
}