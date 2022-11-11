import React, {useState} from "react";
import {AxiosError} from 'axios';
import PropTypes from 'prop-types';
import {register} from "../api";

async function registerUser(credentials, setErr) {
    try {
        const {data} = await register(credentials);

        return data.token;
    } catch (err) {
        if (err instanceof AxiosError && err.response != null) {
            if (err.response.status === 400) {
                setErr(err.response.data);
                return null;
            }
        }
        console.log(err);
        return null;
    }
}

export default function Register({setToken}) {
    const [err, setErr] = useState();
    const [enabled, setEnabled] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault();
        setEnabled(false);
        const token = await registerUser({
            email: e.target.email.value,
            name: e.target.name.value,
            password: e.target.password.value
        }, setErr);
        setEnabled(true);
        if (token != null) {
            setToken(token);
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

Register.propTypes = {
    setToken: PropTypes.func.isRequired
}