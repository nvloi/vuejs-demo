<script>
import {mapActions, mapState} from "vuex";
import PokemonItem from "@/components/PokemonV2/PokemonItem.vue";

export default {
  data() {
    return {
      pk_ids: [1, 4, 7],
      current_pks: []
    }
  },
  async created() {
    await this.getPokemon(this.pk_ids);
    console.log("created");
  },
  async mounted() {
    await this.getPokemon(this.pk_ids);
    console.log("mounted");
  },
  components: {
    PokemonItem
  },
  computed: {
    ...mapState({
      pokemon_list: state => state.pokemon_v2.pks,
      pokemon_list_child: state => state.pokemon_v2.pks_child
    })
  },
  methods: {
    ...mapActions('pokemon_v2', ['getPokemon', "getPokemonEvolution"]),
    async event_show_evolution(pk_id) {
      if (this.pk_ids.includes(pk_id)) {
        this.pk_ids.push(10);
        await this.getPokemon(this.pk_ids);
        await this.getPokemonEvolution([pk_id + 1, pk_id + 2]);
        this.current_pks = [pk_id, pk_id + 1, pk_id + 2];
      }
    }
  }
}
</script>

<template>
  <PokemonItem v-for="item in pokemon_list" :key="item.id" :item="item"
               :event_show_evolution="event_show_evolution"
               :child_item="pokemon_list_child"
               :current_pks="current_pks" >
    <template #image><img :src="item.image" :style="{'max-width': '100%'}"/></template>
    <template #name>{{ item.name }}</template>
    <ul>
      <li v-for="type in item.types">{{ type.name }}</li>
    </ul>
  </PokemonItem>
</template>
