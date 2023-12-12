import { createStore } from 'vuex'
import pokemon from "@/store/modules/pokemon";
import pokemon_v2 from "@/store/modules/pokemonv2";
import pokemonPlugin from "@/store/plugins/pokemon";
import { createLogger } from 'vuex'

export default createStore({
    modules: {
        pokemon,
        pokemon_v2
    },
    plugins:  [pokemonPlugin, createLogger()],
    strict: true // process.env.NODE_ENV !== 'production'
})

