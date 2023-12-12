import {defineStore} from 'pinia';
import auth from "@/data/auth";
import {albumModule} from "@/pinia/modules/albumModule";

export const authModule =  defineStore({
    id: 'authModule',
    state: () => ({
        isAuth: localStorage.getItem('isAuth') || false,
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
        username: localStorage.getItem('userName') || null,
        isLoading: false
    }),
    actions: {
        async login(username, password) {
            try {
                this.isLoading = true;
                const data = await auth.performLogin(username, password);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('userName', username);
                this.isAuth = true;
                this.token = data.accessToken;
                this.refreshToken = data.refreshToken;
                this.username = username;
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
        async getToken() {
            try {
                this.isLoading = true;
                if (!this.token || !this.refreshToken) {
                    throw new Error('Invalid token')
                }
                const data = await auth.getToken(this.token, this.refreshToken);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('token', data.accessToken);
                this.isAuth = true;
                this.token = data.accessToken;
            } catch (error) {
                console.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        logout() {
            localStorage.removeItem('isAuth');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userName');
            this.isAuth = false;
            this.token = null;
            this.refreshToken = null;
            this.username = null;
            const album = albumModule()
            album.removeAlbums();
        }
    }
});