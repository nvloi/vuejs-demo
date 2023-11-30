import pokemon from "@/data/pokemon";

// initial state
const state = () => ({
    pks: [],
    pks_child: [],
})

// getters
const getters = {}

// actions
const actions = {
    async getPokemon({ commit }, pk_ids) {
        const pokemon_list = await pokemon.getPokemonList(pk_ids);
        console.log(pokemon_list);
        commit('setPokemon', pokemon_list)
    },
    async getPokemonEvolution({ commit }, pk_ids) {
        const pokemon_list = await pokemon.getPokemonList(pk_ids);
        console.log(pokemon_list);
        commit('setPokemonChild', pokemon_list)
    }
}

// mutations
const mutations = {
    setPokemon(state, pokemon) {
        state.pks = pokemon
    },
    setPokemonChild(state, pokemon) {
        state.pks_child = pokemon
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
