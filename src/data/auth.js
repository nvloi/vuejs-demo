import axios from "axios";
import {authModule} from "@/pinia/modules/authModule";

const api = createApi();
export default {
    async performLogin(username, password) {
        return await api.post("login", {
            username: username,
            password: password,
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
        })
    },
    async getToken(token, refreshToken) {
        return await api.post("refresh-token", {
                refreshToken: refreshToken,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
        })
    }
}

function createApi() {
    let url = `http://localhost:5000/api/auth`;
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
