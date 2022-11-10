import PropTypes from "prop-types";

export default function LoginService({service, userId}) {

    function click() {
        window.location.replace("http://localhost:8080/auth/" + service.name + (userId ? "?userId=" + userId : ""));
    }

    return <div onClick={click}>
        <img src={service.files.logo} alt={service.name} width={50} height={50}/>
        {service.displayName}
    </div>
}

LoginService.propTypes = {
    service: PropTypes.object.isRequired,
    userId: PropTypes.object,
}