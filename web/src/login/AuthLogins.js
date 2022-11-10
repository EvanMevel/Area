import {useEffect, useState} from "react";
import {getAuthServices} from "../api";
import LoginService from "./LoginService";
import PropTypes from "prop-types";


export default function AuthLogins({userId}) {
    const [services, setServices] = useState([]);

    async function loadServices() {
        const authServices = await getAuthServices();
        console.log(JSON.stringify(authServices));
        let srvcs = [];

        for (let i = 0; i < authServices.length; i++) {
            srvcs.push(
                <div key={i}>
                    <LoginService service={authServices[i]} userId={userId}></LoginService>
                </div>)
        }
        setServices(srvcs);
    }

    useEffect(() => {
        loadServices();
        console.log("loadServices")
    }, [])

    return <div>
        {services.length > 0 && (
            <div>
                {services}
            </div>
        )}
    </div>
}

AuthLogins.propTypes = {
    userId: PropTypes.object,
}