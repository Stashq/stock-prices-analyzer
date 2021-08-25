<template>
  <div>
    <Navbar @sing-out="singOut()" />
    <Sidebar />
    <main>
      <div class="tables-container">
        <h1>At this moment, database administration is not avaible.</h1>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  margin-left: 290px;
}

.tables-container {
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
