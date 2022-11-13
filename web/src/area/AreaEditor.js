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

    const containere = {
        "display": "flex",
        "alignItems": "center",
        "flexDirection": "column",
        "justifyContent": "space-between"
    }

    const input = {
        "width": "100%",
        "padding": "10px 20px",
        "margin": "8px 0",
        "boxSizing": "border-box",
        "border": "none",
        "borderBottom": "1px solid",
        "width": "300px"
    }

    return <div id="create-area" style={containere}>
        <ActionSelect setValue={setAction}/>
        <ReactionSelect setValue={setReaction} action={action}/>
        <input type="text" name="name" placeholder="Area name" onChange={event => setName(event.target.value)} style={input}/>
    </div>

}

AreaEditor.propTypes = {
    setArea: PropTypes.func.isRequired,
}