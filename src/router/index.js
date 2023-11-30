import {createRouter, createWebHistory} from 'vue-router'

import Pokemon from '@/components/Pokemon/Pokemon.vue'
import PokemonV1 from '@/components/PokemonV1/Pokemon.vue'
import PokemonV2 from '@/components/PokemonV2/Pokemon.vue'
import Post from "@/components/Post/Post.vue";
import PostV2 from "@/components/PostV2/Post.vue";

const router_app = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/pokemon',
            component: Pokemon
        },
        {
            path:'/pokemonv1',
            component: PokemonV1
        },
        {
            path:'/pokemonv2',
            component: PokemonV2
        },
        {
            path:'/post',
            component: Post
        },
        {
            path:'/postv2',
            component: PostV2
        }
    ]

})

export {router_app}