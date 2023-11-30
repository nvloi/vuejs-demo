<script>
export default{
  emits: ['emit_hashTag', 'emit_like'],
  props: ['item', 'likeLists'],
  data() {
    return {
      likeBtnStatus : false
    }
  },
  methods: {
    addLike(id, likes) {
      if (!this.likeBtnStatus) {
        this.likeBtnStatus = true;
        likes++;
        this.$emit('emit_like', {id: id, like: likes});
        setTimeout(() => {
          this.likeBtnStatus = false;
        }, 0);
      }
    },
    setHashTag(tag) {
      this.$emit('emit_hashTag', tag);
    }
  }
}
</script>

<template>
  <div class="item-box">
    <div class="item">
      <div class="details">
        <h2>
          <slot name="name"></slot>
        </h2>
        <slot name="content"></slot>
        <br/>
        <i>Tag:
          <span v-for="(tag, index) in item.hashtags" :key="index">
            <a href="#" @click.prevent="setHashTag(tag)" > #{{ tag }}
              <span v-if="index !== item.hashtags.length - 1">, </span>
            </a>
          </span>
        </i>
        <br/>
        <button :disabled="likeBtnStatus"  @click="addLike(item.id, item.likes)">Like <span>{{ item.likes }}</span></button>
      </div>
    </div>
  </div>
  <hr/>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.item-box > :hover {
  background: rgba(51, 170, 51, .5);
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