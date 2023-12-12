<script setup>
import {useStore} from "vuex";
import PokemonItem from "@/components/PokemonV3/PokemonItem.vue";
import {computed} from "vue";

const store = useStore();
const pks_active = computed(() => store.state.pokemon.pks_active);
const currentPage = computed(() => store.state.pokemon.currentPage);
const paginatedPks = computed(() => store.getters['pokemon/paginatedPks']);
const totalPages = computed(() => store.getters['pokemon/totalPages']);
const changePage = (page) => {
  store.dispatch('pokemon/changePage', page);
};
store.dispatch('pokemon/getPokemon');
async function updatePokemonActive(ids) {
  await store.dispatch('pokemon/setPokemonActive', ids.target.value);
}
</script>

<template>
  <div>
    <input :value="pks_active" @input="updatePokemonActive">
  </div>
  <div class="scroll">
    <PokemonItem v-for="item in paginatedPks" :key="item.id" :item="item" :level="0">
      <template #image><img :src="item.image" :style="{'max-width': '100%'}"/></template>
      <template #name>{{ item.name }}</template>
      <ul>
        <li v-for="type in item.types">{{ type.name }}</li>
      </ul>
    </PokemonItem>
  </div>
  <div class="paginate">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"> &lt;</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"> &gt;</button>
  </div>
</template>

<style scoped>
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

<script>
export default {
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
}
</script>