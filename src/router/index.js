import {createRouter, createWebHistory} from 'vue-router'

import Pokemon from '@/components/Pokemon/Pokemon.vue'
import PokemonV1 from '@/components/PokemonV1/Pokemon.vue'
import PokemonV2 from '@/components/PokemonV2/Pokemon.vue'
import PokemonV3 from '@/components/PokemonV3/Pokemon.vue'
import Post from "@/components/Post/Post.vue";
import PostV2 from "@/components/PostV2/Post.vue";
import Music from "@/components/Music/Music.vue";
import User from "@/components/Music/User.vue";
import Album from "@/components/Music/Album.vue";

const router_app = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/pokemon', component: Pokemon},
        {path: '/pokemonv1', component: PokemonV1},
        {path: '/pokemonv2', component: PokemonV2},
        {path: '/pokemonv3', component: PokemonV3},
        {path: '/post', component: Post},
        {path: '/postv2', component: PostV2},
        {path: '/music', component: Music},
        {name: 'album', path: '/album/:id', component: Album},
        {path: '/user/:id', component: User},
    ]

})

export {router_app}