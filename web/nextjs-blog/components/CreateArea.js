import React, {useEffect, useState} from "react";
import {createArea, getActionList, getReactionList} from "../api";
import {AxiosError} from "axios";
import PropTypes from "prop-types";

export default function CreateArea({created}) {
    const [actions, setActions] = useState(null);
    const [reactions, setReactions] = useState(null);
    const [name, setName] = useState();
    const [action, setAction] = useState();
    const [reaction, setReaction] = useState();
    const [err, setErr] = useState();

    async function callAction() {
        try {
            const acts = await getActionList();

            const actionsElements = acts.map((action) => {
                return <option value={action.name}>{action.displayName}</option>
            })

            setActions(actionsElements);

            if (reactions == null && acts.length > 0) {
                callReaction(acts[0].name)
                setAction(acts[0].name);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function callReaction(action) {
        const token = localStorage.getItem("token");
        try {
            const {data} = await getReactionList(token, action);

            const reactionsElements = data.map((reaction) => {
                return <option value={reaction.name}>{reaction.displayName}</option>
            });

            setReactions(reactionsElements);

            if (reaction == null && data.length > 0) {
                setReaction(data[0].name);
            }
        } catch (err) {

        }
    }

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

    useEffect(() => {
        callAction();
    }, [])

    return <div>
        {(actions && reactions) && (
            <div>
                <div id="create-area">
                    <div>
                        <select onChange={event => {
                            callReaction(event.target.value);
                            setAction(event.target.value);
                        }}>
                            {actions}
                        </select>
                    </div>
                    <div>
                        <select onChange={event => setReaction(event.target.value)}>
                            {reactions}
                        </select>
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="Area name" onChange={event => setName(event.target.value)}/>
                    </div>
                    <div>
                        <button type="submit" onClick={create}>Create</button>
                    </div>
                </div>
                <div>
                    {err && <h2>{err.message}</h2>}
                </div>
            </div>
        )}
    </div>
}

CreateArea.propTypes = {
    created: PropTypes.func.isRequired
}