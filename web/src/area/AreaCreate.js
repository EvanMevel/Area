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

    const containere = {
        "display": "flex",
        "alignItems": "center",
        "flexDirection": "column",
        "justifyContent": "space-between"
    }

    return  <TokenGuard>
        <AreaEditor setArea={setArea}/>
        <div style={containere}>
            <button type="submit" onClick={create} style={button}>Create</button>
        </div>
        <div>
            {err && <h2>{err.message}</h2>}
        </div>
    </TokenGuard>
}