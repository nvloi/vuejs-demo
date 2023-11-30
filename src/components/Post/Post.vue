<script>
import { testPosts } from '@/data/testPosts.js'
import PostItem from "@/components/Post/PostItem.vue";
export default {
  data() {
    return {
      posts: testPosts,
      searchText: "",
      hashTags: []
    }
  },
  components: {
    PostItem
  },
  computed: {
    listPost() {
      return this.posts.filter(p => p.title.includes(this.searchText))
          .filter((item) => {
            return this.hashTags.every((tag) => item.hashtags.includes(tag));
          });
    },
    hashTagStr() {
      return this.hashTags.join(', ');
    }
  },
  methods: {
    handleHashTag(data) {
      if (!this.hashTags.includes(data)) {
        this.hashTags.push(data);
      }
    },
    handleLikeList(data) {
      const index = this.posts.findIndex(p => p.id === data.id);
      this.addElementToObject(index, 'likes', data.like);
    },
    emptyHashTags(){
      this.hashTags = [];
    },
    addElementToObject(index, key, value) {
      if (index >= 0 && index < this.posts.length) {
        this.posts[index][key] = value;
      }
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
      <input v-model="hashTagStr" type="text" @click="emptyHashTags()">
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
