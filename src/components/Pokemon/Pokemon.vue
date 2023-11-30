<script>
import {mapActions, mapGetters, mapState} from "vuex";
import PokemonItem from "@/components/Pokemon/PokemonItem.vue";

export default {
  data() {
    return {

    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  async created() {
    console.log("created");
    await this.getPokemon();
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
  components: {
    PokemonItem
  },
  computed: {
    ...mapState({
      pks: state => state.pokemon.pks,
      currentPage: state => state.pokemon.currentPage
    }),
    ...mapGetters('pokemon', ['paginatedPks', 'totalPages']),
  },
  methods: {
    ...mapActions('pokemon', ['getPokemon', 'changePage']),
  }
}
</script>

<template>
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
