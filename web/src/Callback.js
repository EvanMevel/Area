import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {callback} from "./api";
import {useEffect} from "react";
import {AxiosError} from "axios";

export default function Callback() {
    let navigate = useNavigate();
    let { service } = useParams();
    const [searchParams] = useSearchParams();

    async function call() {
        const {data, error} = await callback(service, searchParams);

        console.log(data);
        console.log(error);
        if (error) {
            if (error instanceof AxiosError && error.response != null && error.response.data.message != null) {
                return navigate("/login?error=" + encodeURIComponent(error.response.data.message));
            }
            return navigate("/login?error=" + encodeURIComponent(error.message));
        }
        if (data.token) {
            localStorage.setItem("token", data.token);
        } else if (data.service) {
            return navigate("/app?connected=" + service);
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