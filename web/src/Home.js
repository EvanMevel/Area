import {useNavigate, useSearchParams} from "react-router-dom";
import TokenGuard from "./login/TokenGuard";
import AreaList from "./area/AreaList";
import {useEffect} from "react";
import { Store } from 'react-notifications-component';

export default function Home() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();

    function createArea(e) {
        navigate("/app/create")
    }

    function logout(e) {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        const connected = searchParams.get("connected");
        if (connected) {
            Store.addNotification({
                message: "Linked " + connected + " with your AREA account!",
                type: "success",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 5000
                }
            });
        }
    }, [])

    const button = {
        "background-color": "#5D3FD3",
        "border": "none",
        "color": "white",
        "padding": "10px 64px",
        "text-align": "center",
        "text-decoration": "none",
        "display": "inline-block",
        "font-size": "16px",
        "margin": "4px 2px",
        "cursor": "pointer"
    }

    return <TokenGuard>
        <div>
            <button onClick={logout} style={button}>Logout</button>
        </div>
        <div>
            <button onClick={createArea} style={button}>Create new area</button>
        </div>
        <AreaList/>
    </TokenGuard>
}