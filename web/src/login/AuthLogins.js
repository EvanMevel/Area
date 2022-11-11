import {useEffect, useState} from "react";
import {getAccounts, getAuthServices} from "../api";
import LoginService from "./LoginService";
import PropTypes from "prop-types";


export default function AuthLogins({userId}) {
    const [services, setServices] = useState([]);

    async function loadServices() {
        const authServices = await getAuthServices();
        const accounts = [];

        if (userId != null) {
            const token = localStorage.getItem("token");
            const {data} = await getAccounts(token);
            data.forEach((account) => {
                accounts.push(account.service);
            });
        }

        let srvcs = [];
        let i = 0;

        authServices.forEach((service) => {
            srvcs.push(
                <div key={i++}>
                    <LoginService service={service} logged={accounts.includes(service.name)} userId={userId}></LoginService>
                </div>)
        })
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
    userId: PropTypes.number,
}