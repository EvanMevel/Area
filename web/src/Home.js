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