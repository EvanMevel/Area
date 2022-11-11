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
        const noUser = searchParams.get("noUser");
        if (noUser) {
            Store.addNotification({
                message: "No area account linked with this " + noUser + " account!",
                type: "danger",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 5000
                }
            });
        }
    }, [])

    return <div>
        <form onSubmit={handleSubmit} onChange={() => {setErr(null)}}>
            <div>
                <input type={"username"} name={"name"} placeholder="Name or email"/>
            </div>
            <div>
                <input type={"password"} name={"password"} placeholder="Password"/>
            </div>
            <div>
                <button type="submit" disabled={!enabled}>Login</button>
            </div>
        </form>

        <a href="/register">Dont have an account? Register here</a>

        {err && <h2>{err.message}</h2>}

        <div/>
        <AuthLogins/>
    </div>
}
