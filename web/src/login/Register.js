import React, {useState} from "react";
import {AxiosError} from 'axios';
import {register} from "../api";
import {useNavigate} from "react-router-dom";

async function registerUser(credentials) {
    try {
        const {data} = await register(credentials);

        return {token: data.token};
    } catch (err) {
        if (err instanceof AxiosError && err.response != null) {
            if (err.response.status === 400) {
                return {error: err.response.data};
            }
        }
        return {error: err};
    }
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

    return <div>

        <form onSubmit={handleSubmit} onChange={() => {setErr(null)}}>
            <div>
                <input type={"email"} name={"email"} placeholder="Email"/>
            </div>
            <div>
                <input type={"username"} name={"name"} placeholder="Name"/>
            </div>
            <div>
                <input type={"password"} name={"password"} placeholder="Password"/>
            </div>
            <div>
                <button type="submit" disabled={!enabled}>Register</button>
            </div>
        </form>

        {err && <h2>{err.message}</h2>}
    </div>
}
