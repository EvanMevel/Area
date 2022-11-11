import PropTypes from "prop-types";
import {useRouter} from "next/router";

export default function LoginService({service, userId}) {
    const router = useRouter();

    function click() {
        router.push("http://localhost:8080/auth/" + service.name + (userId ? "?userId=" + userId : ""));
    }

    return <div onClick={click}>
        <img src={service.files.logo} alt={service.name} width={50} height={50}/>
        <text>{service.displayName}</text>
    </div>
}

LoginService.propTypes = {
    service: PropTypes.object.isRequired,
    userId: PropTypes.object,
}