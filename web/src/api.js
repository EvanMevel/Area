import axios from "axios";

const baseUrl = "http://localhost:8080";

export function getAreaList(token) {
    return axios.get(
        baseUrl + "/api/area_list",
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            },
        },
    );
}

export function getUserInfo(token) {
    return axios.get(
        baseUrl + "/api/me",
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            },
        },
    );
}

export async function getAuthServices() {
    const {data} = await axios.get(
        baseUrl + "/about.json"
    );
    let result = [];
    const services = data.server.services;

    services.forEach((service) => {
        console.log(service.name + "  " + service.oauth);
        if (service.oauth) {
            delete service["actions"];
            delete service["reactions"];
            result.push(service);
        }
    })
    return result;
}

export async function getActionList(token) {
    const {data} = await axios.get(
        baseUrl + "/api/actions",
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    );
    return data;
}

export async function getReactionList(token, action) {
    const {data} = await axios.get(
        baseUrl + "/api/reactions?action=" + action,
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    );
    return data;
}

export function deleteArea(token, id) {
    return axios.delete(
        baseUrl + "/api/area?id=" + id,
        {
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + token
            }
        }
    );
}

export function createArea(token, area) {
    return axios.post(
        baseUrl + "/api/area",
        area,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: "Bearer " + token
            }
        }
    );
}

export function login(credentials) {
    return axios.post(
        baseUrl + "/auth/login",
        credentials,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }
    );
}

export function register(credentials) {
    return axios.post(
        baseUrl + "/auth/register",
        credentials,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }
    );
}

export function callback(service, searchParams) {
    let params = null;
    for(let entry of searchParams.entries()) {
        if (params == null) {
            params = "?";
        } else {
            params += "&";
        }
        params += entry[0] + "=" + entry[1];
    }
    return axios.get(
        baseUrl + "/auth/" + service + "/callback" + params
    );
}

export function getAccounts(token) {
    return axios.get(
        baseUrl + "/api/accounts",
        {
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + token
            }
        }
    );
}