import { createStore } from 'vuex'
import pokemon from "@/store/modules/pokemon";
import pokemon_v2 from "@/store/modules/pokemonv2";

export default createStore({
    modules: {
        pokemon,
        pokemon_v2
    },
})