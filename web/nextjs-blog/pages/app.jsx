import TokenGuard from "../components/TokenGuard";
import React from "react";
import AreaList from "../components/AreaList";
import {useRouter} from "next/router";

export default function app() {
    const router = useRouter();

    function createArea(e) {
        router.push("/create")
    }

    function logout(e) {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return <TokenGuard>
        <div>
            <button onClick={logout}>Logout</button>
        </div>
        <div>
            <button onClick={createArea}>Create new area</button>
        </div>
        <AreaList/>
    </TokenGuard>
}