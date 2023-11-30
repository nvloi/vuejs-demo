<script>
export default{
  props: ['event_show_evolution', 'current_pks', 'item', 'child_item'],
  methods: {
      event_show_evolution_display(pk_block_id) {
        return this.current_pks.includes(pk_block_id);
      },
      get_class_condition(pk_block_id) {
        return this.current_pks.includes(pk_block_id) ? 'active' : 'inactive';
      }
  }
}
</script>

<template>
  <div class="item-box" :class="get_class_condition(item.id)">
    <div class="item">
      <div class="image" @click="event_show_evolution(item.id)">
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
    <PokemonItem v-for="item in child_item" :key="item.id" :item="item"
                 :event_show_evolution="event_show_evolution" :current_pks="this.current_pks">
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