import axios from "axios";
import {authModule} from "@/pinia/modules/authModule";

export function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export function CustomError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

export function createApi(param) {
    let url = `http://localhost:5000/api`;
    if (param) {
        url = `http://localhost:5000/api/${param}`
    }
    const api = axios.create({
        baseURL: url
    });

    api.interceptors.response.use(
        response => response,
        async error => {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log("Interceptors 401");
                    const auth = authModule();
                    await auth.getToken();
                    error.config.headers['Authorization'] = `Bearer ${auth.token}`;
                    return api.request(error.config).then(response => {
                        console.log("Response 2", response)
                        return response;
                    }).catch(error => {
                        console.log("Error 2", error)
                        throw error;
                    })
                }
            }
            throw error;
        }
    );

    return api;
}