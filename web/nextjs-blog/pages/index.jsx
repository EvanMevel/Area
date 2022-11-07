import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

function useQuery() {
    return new URLSearchParams(window.location.search);
}


export default function index() {
    const router = useRouter();

    useEffect(() => {
        const tok = useQuery().get("token");

        if (tok != null) {
            localStorage.setItem("token", tok);
        }
        router.push("/app");
    }, [])

    return <div>
        <text>Groupaphil</text>
    </div>
}