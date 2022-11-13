import {deleteRequest, get, post} from "./areaServer";

export async function getAreaList() {
    return get("api/area_list");
}

export async function getUserInfo() {
    return get("api/me");
}

export async function getAuthServices() {
    const {data, error} = await get("about.json");

    if (error) {
        return {error: error};
    }
    const services = data.server.services.filter((service) => {
        return service.oauth;
    })
    return {data: services};
}

export async function getActionList() {
    return get("api/actions");
}

export async function getReactionList(action) {
    return get("api/reactions?action=" + action);
}

export function deleteArea(id) {
    return deleteRequest("api/area?id=" + id);
}

export function createArea(area) {
    return post("api/area", area);
}

export function login(credentials) {
    return post("auth/login", credentials);
}

export function register(credentials) {
    return post("auth/register", credentials);
}

export async function callback(service, searchParams) {
    let params = null;
    for(let entry of searchParams.entries()) {
        if (params == null) {
            params = "?";
        } else {
            params += "&";
        }
        params += entry[0] + "=" + entry[1];
    }
    return await get("auth/" + service + "/callback" + params);
}

export function getAccounts() {
    return get("api/accounts");
}