import PropTypes from "prop-types";

export default function LoginService({service, logged, userId}) {

    function click() {
        let url = "http://localhost:8080/auth/" + service.name +
            "?callback=" +
            encodeURIComponent("http://localhost:3000/callback/" + service.name) +
            (userId ? "&userId=" + userId : "");

        window.location.replace(url);
    }

    const logo_img = {
        "float": "left",
        "display": "flex",
        "alignItems": "stretch",
        "flexWrap": "wrap",
        "alignContent": "space-between",
        "flexDirection": "row",
        "width":"20%"
    }

    if (userId != null) {
       logo_img.background= (logged ? "green" : "red")
    }

    return <div onClick={click}>
        <img src={service.files.logo} alt={service.name} style={logo_img} />
        <div>
            {service.displayName}
        </div>
    </div>
}

LoginService.propTypes = {
    service: PropTypes.object.isRequired,
    logged: PropTypes.bool.isRequired,
    userId: PropTypes.number
}