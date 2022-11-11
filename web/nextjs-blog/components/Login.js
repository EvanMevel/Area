import React, {useState} from "react";
import {AxiosError} from 'axios';
import PropTypes from 'prop-types';
import {login} from "../api";
import AuthLogins from "./AuthLogins";

async function loginUser(credentials) {
    try {
        const {data} = await login(credentials);

        return {token: data.token};
    } catch (err) {
        return {error: err};
    }
}

export default function Login({setToken}) {
    const [err, setErr] = useState();
    const [enabled, setEnabled] = useState(true);

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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}