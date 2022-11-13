import TokenGuard from "../login/TokenGuard";
import {useEffect, useState} from "react";
import {getUserInfo} from "../api";
import AuthLogins from "../login/AuthLogins";

export default function Services() {
    const [user, setUser] = useState();

    async function loadUser() {
        const {data, error} = await getUserInfo();
        if (error) {
            return console.error(error);
        }
        setUser(data);
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