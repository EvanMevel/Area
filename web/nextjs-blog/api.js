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

export async function getActionList() {
    const {data} = await axios.get(
        baseUrl + "/about.json"
    );
    let actions = [];
    const services = data.server.services;
    services.forEach((service) => {
        const serviceActions = service.actions;
        serviceActions.forEach((action) => {
            actions.push(action);
        })
    })
    return actions;
}

export function getReactionList(token, action) {
    return axios.get(
        baseUrl + "/api/reactions?action=" + action,
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        }
    );
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