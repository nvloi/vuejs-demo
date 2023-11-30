<script>
import axios from 'axios';
import PokemonItem from './PokemonItem.vue'

export default {
  data() {
    return {
      list_pokemon: [],
      list_pokemon_display: [],
      list_pokemon_child: [],
      current_pks: [],
      evolution_data: [],
      pk_ids: [1, 4, 7],
      pokemon_api_url: 'https://pokeapi.co/api/v2/pokemon',
      evolution_api_url: 'https://pokeapi.co/api/v2/evolution-chain',
      loading: true
    }
  },
  components: {
    PokemonItem
  },
  mounted() {
    // this.fetchData();
  },
  async created() {
    this.list_pokemon_display = await this.onFetchData(this.pk_ids);
    this.loading = false;
  },
  computed: {
  },
  methods: {
    /*async fetchData() {
      axios.get(this.pokemon_api_url)
          .then(response => {
            this.list_pokemon = response.data.results
          })
          .catch(error => {
            console.error(error);
          });
    },*/
    async onFetchData(pk_ids) {
      const response = await Promise.all(pk_ids.map(id => window.fetch(`${this.pokemon_api_url}/${id}`)))
      const jsons = await Promise.all(response.map(js => js.json()));

      const pks = jsons.map(data => {
        const pk = {};
        pk.id = data.id;
        pk.name = data.name;
        pk.image = data.sprites.other['official-artwork'].front_default;
        pk.types = data.types.map(tp => {
          return {name: tp.type.name}
        })
        return pk;
      })

      return pks;
    },
    async event_show_evolution(pk_id) {
      // await this.fetchEvolutionData(pk_id);
      if (this.pk_ids.includes(pk_id)) {
        this.list_pokemon_child = await this.onFetchData([pk_id + 1, pk_id + 2]);
        this.current_pks = [pk_id, pk_id +1, pk_id +2];
      }
    }
    /*
    async fetchEvolutionData(pk_id) {
      axios.get(`${this.evolution_api_url}/${pk_id}`)
          .then(response => {
            this.evolution_data = response.data.chain;
            console.log(response.data.chain.evolves_to);
          })
          .catch(error => {
            this.evolution_data = [];
          });
    },*/
  }
}
</script>

<template>
  <PokemonItem v-for="item in list_pokemon_display" :key="item.id" :item="item" :event_show_evolution="event_show_evolution"
               :child_item="list_pokemon_child" :current_pks="current_pks" >
    <template #image><img :src="item.image" :style="{'max-width': '100%'}"/></template>
    <template #name>{{ item.name }}</template>
    <ul>
      <li v-for="type in item.types">{{ type.name }}</li>
    </ul>
  </PokemonItem>
</template>
