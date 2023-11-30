<script>
import { testPosts } from '@/data/testPosts.js'
import {computed, reactive, ref} from "vue";
import PostItem from "@/components/PostV2/PostItem.vue";

export default {
  components: {PostItem},
  setup() {
    const posts = reactive(testPosts);
    const searchText = ref("");
    const hashTags = reactive([]);
    function handleHashTag(data) {
      if (!hashTags.includes(data)) {
        hashTags.push(data);
      }
    }
    function handleLikeList(data) {
       const index = posts.findIndex(p => p.id === data.id);
       addElementToObject(index, 'likes', data.like);
    }
    function addElementToObject(index, key, value) {
      if (index >= 0 && index < posts.length) {
        posts[index][key] = value;
      }
    }
    function clearHashTags() {
      hashTags.splice(0, hashTags.length);
    }

    const listPost = computed(() => {
      return posts.filter(p => p.title.includes(searchText.value))
          .filter((item) => {
            return hashTags.every((tag) => item.hashtags.includes(tag));
          });
    })
    const hashTagStr = computed(() => {
      return hashTags.join(', ');
    })

    return {
      posts,
      searchText,
      hashTags,
      listPost,
      hashTagStr,
      handleHashTag,
      handleLikeList,
      addElementToObject,
      clearHashTags,
    }
  }
}
</script>

<template>
  <div class="item-box">
    <div class="item">
      <h4>Search:</h4>
      <input v-model="searchText" type="text">
      <h4>Tag:</h4>
      <input v-model="hashTagStr" type="text" @click="clearHashTags()">
    </div>
  </div>
  <PostItem v-for="item in listPost" :item="item" @emit_hashTag="handleHashTag" @emit_like="handleLikeList" >
    <template #name>{{ item.title }}</template>
    <template #content>{{ item.content }}</template>
  </PostItem>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.item h4 {
  margin-left: 10px;
  margin-right: 10px;
}

.item-box > :hover {
  background: rgba(51, 170, 51, .5);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
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
