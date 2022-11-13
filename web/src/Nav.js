import {Outlet, Link} from "react-router-dom";


export default function Nav() {
    return <div>
        <nav>
            <h1>
                <Link to="/app">GROUPAPHIL</Link>
                <a> </a>
                <Link to="/app/services">Services</Link>
            </h1>
        </nav>
        <Outlet/>
    </div>
}