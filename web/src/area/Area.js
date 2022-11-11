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

    return <div key={area.id}>
        <div>{area.name}</div>
        <div>{area.actionName}</div>
        <div>{area.reactionName}</div>
        <button onClick={buttonDelete}>Delete</button>
    </div>
}

Area.propTypes = {
    area: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
}