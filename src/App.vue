<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
    components: {
        
    },
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
  background-color: #2A203A;
  background-image: radial-gradient(#b44b4b, #9198e5);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
    height: 200vh;
}
</style>
