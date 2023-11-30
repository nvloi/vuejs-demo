<script>
import {mapActions, mapState} from "vuex";
import pokemon from "@/data/pokemon";

export default{
  props: ['item', 'level'],
  data() {
    return {
      pks_evl: []
    }
  },
  beforeCreate() {
    console.log("beforeCreate " + this.item.id);
  },
  created() {
    console.log("created " +  this.item.id);
  },
  beforeMount() {
    console.log("beforeMount " +  this.item.id);
  },
  mounted() {
    console.log("mounted " +  this.item.id);
  },
  beforeUpdate() {
    console.log("beforeUpdate " +  this.item.id);
  },
  updated() {
    console.log("updated " +  this.item.id);
  },
  computed: {
    ...mapState({
      pks_active: state => state.pokemon.pks_active
    })
  },
  methods: {
      ...mapActions('pokemon', ["setPokemonActive"]),
      async event_show_evolution(pk_id, level) {
        const pk_detail = await pokemon.getPokemonDetail(pk_id);
        const parts = pk_detail.evolution_chain.url.split("/");
        const pk_e_id = parts[parts.length - 2];
        const pk_ids = await pokemon.getPokemonEvolvesToIds(pk_e_id, pk_id);
        this.pks_evl = await pokemon.getPokemonList(pk_ids);
        pk_ids.push(pk_id);
        if (level === 0) {
          await this.setPokemonActive(pk_ids);
        } else {
          const pks_active_ids = this.pks_active.concat(pk_ids)
          await this.setPokemonActive(pks_active_ids);
        }
      },
      event_show_evolution_display(pk_block_id) {
        return this.pks_active.includes(pk_block_id);
      },
      get_class_condition(pk_block_id) {
        return this.pks_active.includes(pk_block_id) ? 'active' : 'inactive';
      }
  }
}
</script>

<template>
  <div class="item-box" :class="get_class_condition(item.id)">
    <div class="item">
      <div class="image" @click="event_show_evolution(item.id, level)">
        <slot name="image"></slot>
      </div>
      <div class="details">
        <h2>
          <slot name="name"></slot>
        </h2>
        <slot></slot>
      </div>
    </div>
  </div>
  <div class="item-box-child" v-if="event_show_evolution_display(item.id)" >
    <PokemonItem v-for="item in pks_evl" :key="item.id" :item="item" :level="level+1">
      <template #image><img :src="item.image" :style="{'max-width': '100%'}"/></template>
      <template #name>{{ item.name }}</template>
      <ul>
        <li v-for="type in item.types">{{ type.name }}</li>
      </ul>
    </PokemonItem>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.item-box-child {
  margin-left: 50px;
}
.item-box > :hover {
  background: rgba(51, 170, 51, .5);
}

.item-box.inactive {
  opacity: 0.5;
}

.item-box.active {
  opacity: 1;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

.details h2 {
  text-transform: capitalize;
}

.image {
  display: flex;
  place-items: center;
  place-content: center;
  width: 50px;
  height: 50px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  .image {
    top: calc(50% - 25px);
    left: 3px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
<script setup>
</script>