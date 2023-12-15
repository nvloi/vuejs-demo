import {defineStore} from 'pinia';
import music from "@/data/music";

export const albumModule = defineStore({
    id: 'albumModule',
    state: () => ({
        albums: [],
        album: {},
        total: 0,
        itemsPerPage: 5,
        isLoading: false,
    }),
    actions: {
        async fetchAlbums(token, page) {
            console.log("fetchAlbums");
            try {
                this.isLoading = true;
                const response = await music.getAlbums(token, page - 1, this.itemsPerPage);
                console.log(response);
                this.albums = response.data;
                this.total = response.count;
                if (!localStorage.getItem('isAuth')) {
                    throw new Error('Invalid credentials');
                }
            } catch (error) {
                this.albums = [];
                this.total = 0;
                console.error("fetchAlbums error");
            } finally {
                this.isLoading = false;
            }
        },
        async fetchAlbum(token, id) {
            console.log("fetchAlbum");
            try {
                this.isLoading = true;
                const response = await music.getAlbum(token, id);
                this.albums.push(response.data);
            } catch (error) {
                console.error("fetchAlbum error");
            } finally {
                this.isLoading = false;
            }
        },
        async fetchSongs(token, page, id) {
            console.log("fetchSongs");
            try {
                this.isLoading = true;
                const response = await music.getSong(token, page - 1, this.itemsPerPage, id);
                const index = this.albums.findIndex((album) => {
                    return parseInt(album.id) === parseInt(id);
                });
                if (index === -1) throw new Error('Invalid album');
                this.albums[index].songs = response.data;
                this.total = response.count;
                if (!localStorage.getItem('isAuth')) {
                    throw new Error('Invalid credentials');
                }
            } catch (error) {
                this.albums = [];
                this.total = 0;
                console.error("fetchSongs error");
            } finally {
                this.isLoading = false;
            }
        },
        async getAlbum(token, albumId) {
            console.log('getAlbum');
            let album = this.albums.find((album) => {
                return parseInt(album.id) === parseInt(albumId);
            });
            if (!album) {
                await this.fetchAlbum(token, albumId);
                album = this.albums.find((album) => {
                    return parseInt(album.id) === parseInt(albumId);
                });
            }
            this.album = album;
        },
        getSongs(albumId) {
            const album = this.albums.find((album) => {
                return parseInt(album.id) === parseInt(albumId);
            });

            return album ? album.songs : [];
        },
        removeAlbums() {
            this.albums = [];
            this.album = {};
            this.total = 0;
            this.isLoading = false;
        },
    },
    getters: {
        getAlbums(state) {
            return state.albums
        },
        getTotalPages() {
            return Math.ceil(this.total / this.itemsPerPage);
        },
    },
});