import React, {useEffect, useState} from "react";
import {createArea, getActionList, getReactionList} from "../api";
import {AxiosError} from "axios";
import PropTypes from "prop-types";
import ARSelect from "./ARSelect";

export default function CreateArea({created}) {
    const [name, setName] = useState();
    const [action, setAction] = useState(null);
    const [reaction, setReaction] = useState(null);
    const [err, setErr] = useState();

    async function create(e) {
        const token = localStorage.getItem("token");
        try {
            const {data} = await createArea(token, {
                name: name,
                actionId: action,
                reactionId: reaction
            });
            created();
        } catch (err) {
            if (err instanceof AxiosError && err.response != null) {
                if (err.response.status === 400) {
                    setErr(err.response.data);
                    return;
                }
            }
            console.log(err);
        }
    }

    let updateReaction = {};
    let updateAction = {};

    useEffect(() => {
        async function up() {
            updateAction.call(await getActionList());
        }
        up();
    }, []);

    async function actionChanged(value) {
        setAction(value);
        const token = localStorage.getItem("token");
        const {data} = await getReactionList(token, value);
        updateReaction.call(data);
    }

    function reactionChanged(value) {
        setReaction(value);
    }

    return <div>
        <div id="create-area">
            <ARSelect setValue={actionChanged} getValue={() => action} updateList={updateAction}/>
            <ARSelect setValue={reactionChanged} getValue={() => reaction} updateList={updateReaction}/>
            {(action && reaction) && (
                <div>
                    <div>
                        <input type="text" name="name" placeholder="Area name" onChange={event => setName(event.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" onClick={create}>Create</button>
                    </div>
                </div>
            )}
        </div>
        <div>
            {err && <h2>{err.message}</h2>}
        </div>
    </div>
}

CreateArea.propTypes = {
    created: PropTypes.func.isRequired
}