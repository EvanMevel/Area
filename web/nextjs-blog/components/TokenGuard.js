import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function TokenGuard({children}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    function authCheck() {
        const token = localStorage.getItem("token");
        if (token == null) {
            setAuthorized(false);
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }

    useEffect(() => {
        authCheck();
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [])
    return (authorized && children);
}