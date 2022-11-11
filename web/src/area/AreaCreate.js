import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import AreaEditor from "./AreaEditor";
import TokenGuard from "../login/TokenGuard";
import {createArea} from "../api";
import {AxiosError} from "axios";


export default function AreaCreate() {
    let navigate = useNavigate();
    const [area, setArea] = useState();
    const [err, setErr] = useState();

    async function create(e) {
        const {data, error} = await createArea({
            name: area.name,
            actionId: area.action,
            reactionId: area.reaction
        });
        if (error) {
            if (error instanceof AxiosError && error.response != null) {
                if (error.response.status === 400) {
                    setErr(error.response.data);
                    return;
                }
            }
            return console.log(error);
        }
        navigate("/app");
    }

    return  <TokenGuard>
        <AreaEditor setArea={setArea}/>
        <div>
            <button type="submit" onClick={create}>Create</button>
        </div>
        <div>
            {err && <h2>{err.message}</h2>}
        </div>
    </TokenGuard>
}