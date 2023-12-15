<script setup>
import Login from "@/components/Music/Login.vue";
import {authModule} from "@/pinia/modules/authModule";

const auth = authModule();
</script>

<template>
  <Login>
  </Login>
  <div class="scroll">
    <div class="item-box">
      <div class="item">
        <div class="details">
          <div class="log-form">
            <div>Account:</div>
            <template v-if="auth.isAuth">
              <div>User {{ $route.params.id }}</div>
            </template>
            <template v-else>
              No Auth
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.loading {
  text-align: center;
}

div.loading img {
  margin-top: 40%;
}

div.paginate {
  text-align: right;
}

div.paginate button {
  margin: 0px 10px;
}

div.scroll {
  padding: 4px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
}

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