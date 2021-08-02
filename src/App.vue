<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
    name: "App",
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: radial-gradient(#b44b4b, #9198e5);
}

body {
    height: 200vh;
}
</style>
