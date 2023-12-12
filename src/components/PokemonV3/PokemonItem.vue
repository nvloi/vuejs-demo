<script setup>
import pokemon from "@/data/pokemon";
import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";

const props = defineProps(['item', 'level']);

const store = useStore();

let pks_evl = reactive([]);
const pks_active = computed(() => store.state.pokemon.pks_active);
const isMounted = ref(true);
const childComponent = ref(null);

const event_show_evolution_display = computed(() => {
  return pks_active.value.includes(props.item.id);
});

const get_class_condition = computed(() => {
  return pks_active.value.includes(props.item.id) ? 'active' : 'inactive';
});

async function event_show_evolution(pk_id, level) {
  const childComponentElement = childComponent.value;
  console.log("abc123-event_show_evolution", childComponentElement);
  const pk_detail = await pokemon.getPokemonDetail(pk_id);
  const parts = pk_detail.evolution_chain.url.split("/");
  const pk_e_id = parts[parts.length - 2];
  const pk_ids = await pokemon.getPokemonEvolvesToIds(pk_e_id, pk_id);
  pks_evl = await pokemon.getPokemonList(pk_ids);
  pk_ids.push(pk_id);
  if (level === 0) {
    await store.dispatch('pokemon/setPokemonActive', pk_ids);
  } else {
    /*const pks_active_ids = pks_active.value.concat(pk_ids).filter((value, index, self) => {
      return self.indexOf(value) === index;
    });*/
    const pks_active_ids = [...new Set([...pks_active.value, ...pk_ids])];
    await store.dispatch('pokemon/setPokemonActive', pks_active_ids);
  }
}

</script>

<template>
  <div>
    <div class="item-box" :class="get_class_condition">
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
    <div class="item-box-child" v-if="event_show_evolution_display">
      <PokemonItem v-for="item in pks_evl" :key="item.id" :item="item" :level="level+1">
        <template #image><img :src="item.image" :style="{'max-width': '100%'}"/></template>
        <template #name>{{ item.name }}</template>
        <ul>
          <li v-for="type in item.types">{{ type.name }}</li>
        </ul>
      </PokemonItem>
    </div>
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

<script>
import {getCurrentInstance} from "vue";

export default {
  beforeCreate() {
    console.log("beforeCreate" + 'item.id');
  },
  created() {
    console.log("created" + 'item.id');
  },
  beforeMount() {
    console.log("beforeMount" + 'item.id');
  },
  mounted() {
    console.log("mounted" + 'item.id');
  },
  beforeUpdate() {
    console.log("beforeUpdate" + 'item.id');
  },
  updated() {
    console.log("updated" + 'item.id');
  },
  unmounted() {
    console.log("unmounted" + 'item.id');
  },
}
</script>