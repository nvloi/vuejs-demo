import {createApi} from "@/data/util";
const api = createApi('auth');
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