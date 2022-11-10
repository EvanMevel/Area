import {useNavigate} from "react-router-dom";
import TokenGuard from "./login/TokenGuard";
import AreaList from "./area/AreaList";

export default function Home() {
    let navigate = useNavigate();

    function createArea(e) {
        navigate("/app/create")
    }

    function logout(e) {
        localStorage.removeItem("token");
        navigate("/login");
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