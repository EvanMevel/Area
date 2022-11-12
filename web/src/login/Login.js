import React, {useState} from "react";
import {login} from "../api";
import AuthLogins from "./AuthLogins";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

async function loginUser(credentials) {
    try {
        const {data} = await login(credentials);

        return {token: data.token};
    } catch (err) {
        if (err instanceof AxiosError) {
            return {error: err.response.data};
        }
        return {error: err};
    }
}

export default function Login() {
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
        const {token, error} = await loginUser({
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
        "align-items": "center",
        "flex-direction": "column",
        "justify-content": "space-between"
    }

    const img = {
        "margin-left": "auto",
        "margin-right": "auto",
        "display": "flex",
        "align-items": "center",
        "flex-direction": "column",
        "width": "33.33%"
    }

    const button = {
        "background-color": "#5D3FD3",
        "border": "none",
        "color": "white",
        "padding": "10px 64px",
        "text-align": "center",
        "text-decoration": "none",
        "display": "inline-block",
        "font-size": "16px",
        "margin": "4px 2px",
        "cursor": "pointer"
    }

    const input = {
        "width": "100%",
        "padding": "10px 20px",
        "margin": "8px 0",
        "box-sizing": "border-box",
        "border": "none",
        "border-bottom": "1px solid"
    }

    const logo_img = {
        "display": "flex",
        "float": "left",
        "padding": "5px",
        "width": "10%"
    }

    var logo = require ('./img/logo.png')
    var deezer = require ('./img/deezer.png')
    var spotify = require ('./img/spotify.png')
    var youtube = require ('./img/youtube.png')

    return <div>

        <img src={logo} style={img}></img>
        <form onSubmit={handleSubmit} onChange={() => {setErr(null)}} style={containere}>
            <div>
                <input type={"username"} name={"name"} placeholder="Name or email" style={input}/>
            </div>
            <div>
                <input type={"password"} name={"password"} placeholder="Password" style={input}/>
            </div>
            <div>
                <button type="submit" disabled={!enabled} style={button}>Login</button>
            </div>
        </form>

        <a href="/register" style={containere}>Dont have an account? Register here</a>

        <div class="row">
            <div class="column">
                <img src={deezer} style={logo_img}/>
            </div>
            <div class="column">
                <img src={spotify} style={logo_img}/>
            </div>
            <div class="column">
                <img src={youtube} style={logo_img}/>
            </div>
        </div>

        {err && <h2>{err.message}</h2>}

        <div/>
        <AuthLogins/>
    </div>
}
