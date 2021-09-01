<template>
  <div>
    <Navbar @sing-out="singOut()" />
    <Sidebar />
    <main>
      <div class="home-container">
        <h1>Wellcome in stock price analyzer!</h1>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
main {
  margin-left: 290px;
}

.home-container {
  border-radius: 25px;
  margin: 10px 30px;
}

h1 {
    color: white;
    margin: 20px;
}
</style>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
