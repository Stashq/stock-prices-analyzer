<template>
    <div>
    <Navbar />
    <Sidebar />
    </div>
</template>
); }

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default {
  components: {
      'Navbar': Navbar,
      'Sidebar': Sidebar,
  },
};
</script>

<style scoped>
</style>
