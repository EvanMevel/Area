import TokenGuard from "../components/TokenGuard";
import {useEffect, useState} from "react";
import {getUserInfo} from "../api";
import AuthLogins from "../components/AuthLogins";


export default function services() {
    const [user, setUser] = useState();

    async function loadUser() {
        const token = localStorage.getItem("token");
        try {
            const {data} = await getUserInfo(token);
            console.log(data);
            setUser(data);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    return <TokenGuard>
        {user && (
            <AuthLogins userId={user.id}/>
        )}
    </TokenGuard>
}