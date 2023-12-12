<script setup>
import MusicItem from "@/components/Music/MusicItem.vue";
import {albumModule} from "@/pinia/modules/albumModule";
import {computed, ref, watchEffect} from "vue";
import Login from "@/components/Music/Login.vue";
import {authModule} from "@/pinia/modules/authModule";
import {useRouter} from "vue-router";

const router = useRouter();

const auth = authModule();
const isAuthenticated = computed(() => auth.isAuth);
const token = computed(() => auth.token);

const currentPage = ref(1);

const album = albumModule();
const isLoading = computed(() => album.isLoading);

const changePage = async (page) => {
  currentPage.value = page;
};

watchEffect(() => {
  if (isAuthenticated.value) {
    album.fetchAlbums(token.value, currentPage.value);
  } else {
    album.albums = [];
    album.currentPage = 1;
    album.total = 0;
  }
});

function navigateToAlbum(id) {
  router.push({ name: 'album', params: { id } })
}
</script>

<template>
  <Login>
  </Login>
  <div class="scroll">
    <template v-if="isLoading">
      <div class="loading"><img alt="Loading" src="@/assets/hourglass.gif" width="50" height="50"/></div>
    </template>
    <template v-else>
      <MusicItem v-for="item in album.albums" :key="item.id" :item="item" :level="0" @click="navigateToAlbum(item.id)">
        <template #name>{{ item.id }}</template>
        {{ item.name }}
      </MusicItem>
    </template>
  </div>
  <div class="paginate">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1 || album.total === 0 || isLoading"> &lt;</button>
    <span>Page {{ currentPage }} of {{ album.getTotalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === album.getTotalPages || album.total === 0 || isLoading"> &gt;</button>
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