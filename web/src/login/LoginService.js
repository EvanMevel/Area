import PropTypes from "prop-types";

export default function LoginService({service, logged, userId}) {

    function click() {
        let url = "http://localhost:8080/auth/" + service.name +
            "?callback=" +
            encodeURIComponent("http://localhost:8081/callback/" + service.name) +
            (userId ? "&userId=" + userId : "");

        window.location.replace(url);
    }

    const logo_img = {
        "float": "left",
        "alignItems": "stretch",
        "flexWrap": "wrap",
        "alignContent": "space-between",
        "flexDirection": "row",
        "width": "75px",
        "border": "solid #fff"
    }

    const img_style = {
        "display": "flex",
        "justifyContent": "center"
    }

    if (userId != null) {
       logo_img.background= (logged ? "green" : "red")
    }

    return <div onClick={click} style={logo_img}>
        <div style={img_style}>
            <img src={"http://localhost:8080" + service.files.logo} alt={service.name} style={img_style} width={50} height={50}/>
        </div>
        <div style={img_style}>
            {service.displayName}
        </div>
    </div>
}

LoginService.propTypes = {
    service: PropTypes.object.isRequired,
    logged: PropTypes.bool.isRequired,
    userId: PropTypes.number
}