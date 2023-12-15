import {describe} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {albumModule} from "@/pinia/modules/albumModule";
import albumData from '@/test/data/album.json';
import music from '@/data/music';

music.getAlbums = vi.fn().mockImplementation(() => {
    return albumData
});

global.localStorage = {
    state: {
        'isAuth': true
    },
    setItem (key, item) {
        this.state[key] = item
    },
    getItem (key) {
        return this.state[key]
    }
}


describe("Album Module", () => {
    let album

    beforeEach(() => {
        setActivePinia(createPinia());
        album = albumModule();
    })

    test('albumModule init', () => {
        expect(album.albums).toStrictEqual([]);
        expect(album.album).toStrictEqual({});
        expect(album.total).toBe(0);
        expect(album.itemsPerPage).toBe(5);
        expect(album.isLoading).toBe(false);
    })

    test('fetchAlbums', async () => {
        expect(music.getAlbums("",0,0)).toBe(albumData)
        await album.fetchAlbums("token", "0");
        expect(album.albums).toStrictEqual(albumData.data);
    })

})