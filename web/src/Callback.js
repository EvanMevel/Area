import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {callback} from "./api";
import {useEffect} from "react";

export default function Callback() {
    let navigate = useNavigate();
    let { service } = useParams();
    const [searchParams] = useSearchParams();

    async function call() {
        const {data} = await callback(service, searchParams);

        if (data.token) {
            localStorage.setItem("token", data.token);
        } else if (data.service) {
            return navigate("/app?connected=" + service);
        } else if (data.noUser) {
            return navigate("/login?noUser=" + service);

        }
        return navigate("/app");
    }

    useEffect(() => {
        if (searchParams.has("code")) {
            call();
        } else {
            navigate("/app");
        }
    }, []);

    return (
        <div>
        </div>
    );
}