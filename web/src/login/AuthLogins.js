import {useEffect, useState} from "react";
import {getAccounts, getAuthServices} from "../api";
import LoginService from "./LoginService";
import PropTypes from "prop-types";


export default function AuthLogins({userId}) {
    const [services, setServices] = useState([]);

    async function loadServices() {
        const {data, error} = await getAuthServices();
        if (error) {
            return console.error(error);
        }
        const accounts = [];

        if (userId != null) {
            const {data, error} = await getAccounts();
            if (error) {
                return console.error(error);
            }
            data.forEach((account) => {
                accounts.push(account.service);
            });
        }

        let srvcs = [];
        let i = 0;

        data.forEach((service) => {
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