import PropTypes from "prop-types";

export default function LoginService({service, logged, userId}) {

    function click() {
        let url = "http://localhost:8080/auth/" + service.name +
            "?callback=" +
            encodeURIComponent("http://localhost:3000/callback/" + service.name) +
            (userId ? "&userId=" + userId : "");

        window.location.replace(url);
    }

    const styles = {
        width: 100
    }

    if (userId != null) {
        styles.background= (logged ? "green" : "red")
    }

    return <div onClick={click} style={styles}>
        <img src={service.files.logo} alt={service.name} width={50} height={50}/>
        {service.displayName}
    </div>
}

LoginService.propTypes = {
    service: PropTypes.object.isRequired,
    logged: PropTypes.bool.isRequired,
    userId: PropTypes.number
}