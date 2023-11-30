import axios from "axios";

export default {
    async getPokemonList(pk_ids) {
        const pokemon_api_url = "https://pokeapi.co/api/v2/pokemon";
        const response = await Promise.all(pk_ids.map(id => window.fetch(`${pokemon_api_url}/${id}`)));
        const jsons = await Promise.all(response.map(js => js.json()));

        const pks = jsons.map(data => {
            const pk = {};
            pk.id = data.id;
            pk.name = data.name;
            pk.image = data.sprites.front_default;
            pk.types = data.types.map(tp => {
                return {name: tp.type.name}
            })
            return pk;
        })

        return pks;
    },
    async getPokemon() {
        await wait(100)
        return axios.get("https://pokeapi.co/api/v2/generation/1/")
            .then(response => {
                const pk_ids = [];
                const pks = response.data.pokemon_species;
                pks.forEach(pk => {
                    const parts = pk.url.split("/");
                    const id = parts[parts.length - 2];
                    pk_ids.push(id);
                })
                return pk_ids;
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    },
    async getPokemonDetail(id) {
        await wait(100)
        return axios.get("https://pokeapi.co/api/v2/pokemon-species/" + id)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
                return {};
            });
    },
    async getPokemonEvolvesToIds(id, pk_id) {
        await wait(100)
        return axios.get("https://pokeapi.co/api/v2/evolution-chain/" + id)
            .then(response => {
                const chain = response.data.chain;
                const ids = this.getPokemonEvolvesTo(chain, pk_id);
                return ids;
            })
            .catch(error => {
                console.error(error);
                return [];
            });
    },
    getPokemonEvolvesTo(chain, pk_id) {
        const parts = chain.species.url.split("/");
        const id = parts[parts.length - 2];
        if (pk_id === parseInt(id)) {
             const pk_ids = [];
             chain.evolves_to.forEach(pk => {
                const parts = pk.species.url.split("/");
                const id = parts[parts.length - 2];
                pk_ids.push(id);
            })
            return pk_ids.map(str => parseInt(str));
        } else {
            let pk_ids = [];
            chain.evolves_to.forEach(chain2 => {
                pk_ids = this.getPokemonEvolvesTo(chain2, pk_id);
            })
            return pk_ids;
        }
        return [];
    }
}

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
