import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function TokenGuard({children}) {
    let navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);

    function authCheck() {
        const token = localStorage.getItem("token");
        if (token == null) {
            setAuthorized(false);
            navigate("/login");
        } else {
            setAuthorized(true);
        }
    }

    useEffect(() => {
        authCheck();
    }, [])
    return (authorized && children);
}