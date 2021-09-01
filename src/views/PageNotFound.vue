<template>
  <div>
    <Navbar />
    <div class="center">
      <h1>Page not found ...</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center {
    color: white;
    position: absolute;
    width: 400px;
    top: 45%;
    left: 50%;
    margin-left: -200px;
};
</style>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "PageNotFound",
  components: {
    Navbar,
  },
};
</script>

