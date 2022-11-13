import axios from "axios";

const baseUrl = "http://localhost:8080/";

function getHeaders(headers) {
    const token = localStorage.getItem("token");
    if (token != null) {
        headers.Authorization = "Bearer " + token
    }
    return headers;
}

async function execute(func) {
    try {
        const {data} = await func();

        return {data: data};
    } catch (err) {
        return {error: err};
    }
}

export function get(endpoint) {
    const headers = getHeaders({
        Accept: "application/json"
    });

    return execute(() => {
        return axios.get(
            baseUrl + endpoint,
            {
                headers: headers
            },
        );
    });
}

export function post(endpoint, body) {
    const headers = getHeaders({
        "Content-Type": 'application/json',
        Accept: "application/json"
    });

    return execute(() => {
        return axios.post(
            baseUrl + endpoint,
            body,
            {
                headers: headers
            }
        );
    });
}

export async function deleteRequest(endpoint) {
    const headers = getHeaders({
        Accept: "application/json"
    });

    return execute(() => {
        return axios.delete(
            baseUrl + endpoint,
            {
                headers: headers
            },
        );
    });
}