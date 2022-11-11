import Login from "../components/Login";

import {useRouter} from 'next/router'

export default function login() {
    const router = useRouter()

    async function setToken(token) {
        localStorage.setItem("token", token);
        router.push("/app");
    }

    return <Login setToken={setToken}></Login>
}