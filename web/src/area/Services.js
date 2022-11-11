import TokenGuard from "../login/TokenGuard";
import {useEffect, useState} from "react";
import {getUserInfo} from "../api";
import AuthLogins from "../login/AuthLogins";


export default function Services() {
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