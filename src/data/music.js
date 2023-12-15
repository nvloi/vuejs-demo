import {CustomError} from "@/data/util";
import axios from "axios";
import {authModule} from "@/pinia/modules/authModule";

const api = createApi();

export default {
    async getAlbums(token, page, size) {
        return await api.get("album", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: page,
                size: size
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            throw new CustomError(error.response.data, error.response.status);
        })
    },
    async getAlbum(token, id) {
        return await api.get(`album/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            throw new CustomError(error.response.data, error.response.status);
        })
    },
    async getSong(token, page, size, albumId) {
        return await api.get("song", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                album_id: albumId,
                page: page,
                size: size
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            throw new CustomError(error.response.data, error.response.status);
        })
    },

}

export function createApi() {
    let url = `http://localhost:5000/api`;
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