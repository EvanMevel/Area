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
        const token = localStorage.getItem("token");
        try {
            const {data} = await createArea(token, {
                name: area.name,
                actionId: area.action,
                reactionId: area.reaction
            });
            navigate("/app");
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