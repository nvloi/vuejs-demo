import pokemon from "@/data/pokemon";

// initial state
const state = () => ({
    pks: [],
    pks_active: [],
    currentPage: 1,
    itemsPerPage: 10,
})

// getters
const getters = {
    paginatedPks(state) {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        return state.pks.slice(start, end);
    },
    totalPages(state) {
        return Math.ceil(state.pks.length / state.itemsPerPage);
    },
}

// actions
const actions = {
    async getPokemon({ commit }) {
        const pk_ids = await pokemon.getPokemon();
        const data = await pokemon.getPokemonList(pk_ids);
        commit('setPokemon', data)
    },
    async setPokemonActive({ commit }, pk_id) {
        commit('setPokemonActive', pk_id);
    },
    changePage({ commit }, page) {
        commit('setCurrentPage', page);
    },
}

// mutations
const mutations = {
    setPokemon(state, data) {
        state.pks = data
    },
    setPokemonActive(state, data) {
        state.pks_active = data
    },
    setCurrentPage(state, page) {
        state.currentPage = page;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
