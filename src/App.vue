<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div class="greetings">
        <h1 class="green">Demo Vue.js</h1>
        <h3>
          <router-link to="/pokemon">Pokemon</router-link> /
          <router-link to="/pokemonv1">Pokemon V1</router-link> /
          <router-link to="/pokemonv2">Pokemon V2</router-link> /
          <router-link to="/pokemonv3">Pokemon V3</router-link> /
          <router-link to="/post">Post</router-link> /
          <router-link to="/postv2">Post V2</router-link> /
          <router-link to="/music">Music</router-link> /
        </h3>
      </div>
    </div>
  </header>

  <main>
      <router-view />
  </main>
</template>

<script>
export default{

}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

</style>
