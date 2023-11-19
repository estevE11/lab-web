import { getCookie } from "./cookieUtils";

export function apiGET(route: string) {
    const baseUrl = "http://localhost:8080";
    return new Promise((resolve, err) => {
        fetch(baseUrl + route, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}

export function apiPOST(route: string, body: any) {
    const baseUrl = "http://localhost:8080";
    return new Promise((resolve, err) => {
        fetch(baseUrl + route, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}

export function apiGETAuth(route: string) {
    const baseUrl = "http://localhost:8080";
    return new Promise((resolve, err) => {
        fetch(baseUrl + route, {
            method: 'GET',
            headers: {
                Authorization: "Bearer" + getCookie("token")
            }
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}

export function apiPOSTAuth(route: string, body: any) {
    const baseUrl = "http://localhost:8080";
    return new Promise((resolve, err) => {
        fetch(baseUrl + route, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Authorization': "Bearer" + getCookie("token")
            }
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}

export function apiLogin(user: string, password: string): boolean {
    return false;
}