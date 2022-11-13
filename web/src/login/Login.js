import React, {useEffect, useState} from "react";
import {login} from "../api";
import AuthLogins from "./AuthLogins";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AxiosError} from "axios";
import {Store} from "react-notifications-component";

async function loginUser(credentials) {
    const {data, error} = await login(credentials);
    if (error) {
        if (error instanceof AxiosError && error.response != null) {
            return {error: error.response.data};
        }
        return {error: error};
    }

    return {token: data.token};
}

export default function Login() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
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

    useEffect(() => {
        const message = searchParams.get("error");
        if (message) {
            Store.addNotification({
                message: message,
                type: "danger",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 5000
                }
            });
        }
    }, [])

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

        {err && <h2>{err.message}</h2>}

        <div/>
        <AuthLogins/>
    </div>
}
