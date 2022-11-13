import PropTypes from "prop-types";
import {deleteArea} from "../api";

export default function Area({area, refresh}) {

    async function buttonDelete(e) {
        const {data, error} = await deleteArea(area.id);
        if (error) {
            return console.error(error);
        }
        refresh();
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
        "cursor": "pointer"
    }

    return <div key={area.id}>
        <div>{area.name}</div>
        <div>{area.actionName}</div>
        <div>{area.reactionName}</div>
        <button onClick={buttonDelete} style={button}>Delete</button>
    </div>
}

Area.propTypes = {
    area: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
}