<script setup>
import {authModule} from "@/pinia/modules/authModule";
import {computed, ref} from "vue";

defineProps();

const username = ref("nvloi");
const password = ref("123456");
const auth = authModule();
const isAuth = computed(() => auth.isAuth);
const isLoading= computed(() => auth.isLoading);
const login = async () => {
  await auth.login(username.value, password.value);
};
const logout = async () => {
  await auth.logout();
};


</script>

<template>
  <div class="item-box">
    <div class="item">
      <div class="details">
        <div class="log-form">
          <div>Account:</div>
          <template v-if="!isAuth">
            <input type="text" v-model="username" title="username" placeholder="username"/>
            <input type="password" v-model="password" title="password" placeholder="password"/>
            <template v-if="isLoading">
              <img alt="Loading" src="@/assets/hourglass.gif" width="15" height="15"/>
            </template>
            <template v-else>
              <button type="button" @click="login()" class="btn">Login</button>
            </template>
          </template>
          <template v-else>
            <router-link :to="`/user/${username}`">Go to User</router-link>
            |
            <button type="button" @click="logout()" class="btn">Logout</button>
          </template>
        </div>
      </div>
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