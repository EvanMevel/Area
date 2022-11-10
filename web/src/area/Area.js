import PropTypes from "prop-types";
import {deleteArea} from "../api";

export default function Area({data, token, refresh}) {

    async function buttonDelete(e) {
        try {
            const {resp} = await deleteArea(token, data.id);
            refresh();
        } catch (err) {
            console.error(err)
        }
    }

    return <div key={data.id}>
        <div>{data.name}</div>
        <div>{data.actionName}</div>
        <div>{data.reactionName}</div>
        <button onClick={buttonDelete}>Delete</button>
    </div>
}

Area.propTypes = {
    data: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired
}