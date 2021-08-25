<template>
    <Nabvar />
</template>

<script>
import Nabvar from "../components/Navbar.vue"

export default {
    name: "SingOut",
    components: {
        Nabvar
    },
    created: function () {
        this.$api
        .post("/logout")
        .then(() => {
          this.$api.defaults.headers.common["Authorization"] = null;
          localStorage.removeItem("token");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          if (this.$router.path === "/login") {
            this.$router.go(0);
          } else {
            this.$router.push("/login");
          }
        })
    }
}
</script>
