import React, {useState} from "react";
import {AxiosError} from 'axios';
import PropTypes from 'prop-types';
import {login} from "../api";

async function loginUser(credentials, setErr) {
    try {
        const {data} = await login(credentials);

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

export default function Login({setToken}) {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [err, setErr] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        const token = await loginUser({
            name,
            password
        }, setErr);
        if (token != null) {
            setToken(token);
        }
    }

    function changeName(e) {
        setName(e.target.value);
        setErr(null);
    }

    function changePass(e) {
        setPassword(e.target.value);
        setErr(null);
    }

    return <div>

        <form onSubmit={handleSubmit}>
            <div>
                <input type={"username"} name={"name"} placeholder="Name or email" onChange={changeName}/>
            </div>
            <div>
                <input type={"password"} name={"pass"} placeholder="Password" onChange={changePass}/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>

        {err && <h2>{err.message}</h2>}
    </div>
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}