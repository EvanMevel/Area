import Register from "../components/Register";

import {useRouter} from 'next/router'

export default function register() {
    const router = useRouter()

    async function setToken(token) {
        localStorage.setItem("token", token);
        router.push("/app");
    }

    return <Register setToken={setToken}></Register>
}