import React, {useState} from "react";
import {AxiosError} from 'axios';
import {register} from "../api";
import {useNavigate} from "react-router-dom";

async function registerUser(credentials) {
    const {data, error} = await register(credentials);
    if (error) {
        if (error instanceof AxiosError && error.response != null) {
            return {error: error.response.data};
        }
        return {error: error};
    }
    console.log(JSON.stringify(data))
    return {token: data.token};
}

export default function Register() {
    let navigate = useNavigate();
    const [err, setErr] = useState();
    const [enabled, setEnabled] = useState(true);

    function setToken(token) {
        localStorage.setItem("token", token);
        navigate("/app");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setEnabled(false);
        const {token, error} = await registerUser({
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value
        }, setErr);
        setEnabled(true);
        if (token != null) {
            setToken(token);
        } else {
            setErr(error);
        }
    }

    const containere = {
        "display": "flex",
        "alignItems": "center",
        "flexDirection": "column",
        "justifyContent": "space-between"
    }

    const img = {
        "marginLeft": "auto",
        "marginRight": "auto",
        "display": "flex",
        "alignItems": "center",
        "flexDirection": "column",
        "width": "33.33%"
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

    const input = {
        "width": "100%",
        "padding": "10px 20px",
        "margin": "8px 0",
        "boxSizing": "border-box",
        "border": "none",
        "borderBottom": "1px solid"
    }

    var logo = require ('./img/logo.png')

    return <div>

        <img src={logo} style={img}></img>
        <form onSubmit={handleSubmit} onChange={() => {setErr(null)}} style={containere}>
            <div>
                <input type={"email"} name={"email"} placeholder="Email" style={input}/>
            </div>
            <div>
                <input type={"username"} name={"name"} placeholder="Name" style={input}/>
            </div>
            <div>
                <input type={"password"} name={"password"} placeholder="Password" style={input}/>
            </div>
            <div>
                <button type="submit" disabled={!enabled} style={button}>Register</button>
            </div>
        </form>

        {err && <h2>{err.message}</h2>}
    </div>
}
