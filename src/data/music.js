import {createApi, CustomError} from "@/data/util";

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