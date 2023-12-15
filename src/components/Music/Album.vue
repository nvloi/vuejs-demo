<script setup>
import MusicItem from "@/components/Music/MusicItem.vue";
import {albumModule} from "@/pinia/modules/albumModule";
import {computed, onBeforeMount, ref, watch} from "vue";
import Login from "@/components/Music/Login.vue";
import {authModule} from "@/pinia/modules/authModule";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const id = route.params.id;
const currentPage = ref(1);
const auth = authModule();
const album = albumModule();
const isAuthenticated = computed(() => auth.isAuth);

const changePage = async (page) => {
  currentPage.value = page;
};

onBeforeMount(async () => {
  if (isAuthenticated.value) {
    await album.getAlbum(auth.token, id);
    await album.fetchSongs(auth.token, currentPage.value, id);
  }
});

watch(currentPage,
    async (newValue, oldValue) => {
      console.log("currentPage", oldValue, "-", newValue);
      if (isAuthenticated.value) {
        await album.fetchSongs(auth.token, newValue, id);
      }
    });

watch(isAuthenticated,
    async (newValue, oldValue) => {
      console.log("isAuthenticated", oldValue, "-", newValue);
      if (isAuthenticated.value) {
        await album.getAlbum(auth.token, id);
        await album.fetchSongs(auth.token, newValue, id);
      }
    });
</script>

<template>
  <Login>
  </Login>
  <div class="scroll">
    <h1>{{ album.album.name }}</h1>
    <template v-if="album.isLoading">
      <div class="loading"><img alt="Loading" src="@/assets/hourglass.gif" width="50" height="50"/></div>
    </template>
    <template v-else>
      <MusicItem v-for="item in album.getSongs(id)" :key="item.id" :item="item" :level="0">
        <template #name>{{ item.id }}</template>
        {{ item.name }}
      </MusicItem>
    </template>
  </div>
  <div class="paginate">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1 || album.total === 0 || album.isLoading">
      &lt;
    </button>
    <span>Page {{ currentPage }} of {{ album.getTotalPages }}</span>
    <button @click="changePage(currentPage + 1)"
            :disabled="currentPage === album.getTotalPages || album.total === 0 || album.isLoading"> &gt;
    </button>
  </div>
</template>

<style scoped>
div.loading {
  text-align: center;
}

div.loading img {
  margin-top: 40%;
}

div.paginate {
  text-align: right;
}

div.paginate button {
  margin: 0px 10px;
}

div.scroll {
  padding: 4px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}
</style>