<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="/home">Stock Dashboard</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-button v-b-modal="'my-modal'">
          <b-icon icon="search"></b-icon>
        </b-button>

        <b-modal id="my-modal" title="Search">
          <div>
            <b-form-input></b-form-input>
          </div>
        </b-modal>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#" disabled>PL</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown v-if="userLogged" right text="User">
          <b-dropdown-item href="#" disabled>Profile</b-dropdown-item>
          <b-dropdown-item href="/singout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-if="!userLogged" href="/login" right>Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      userLogged: localStorage.getItem("token"),
    };
  },
  emit: ["sing-out"],
};
</script>

<style scoped>
.btn-secondary {
  background-color: inherit;
  border-color: transparent;
}
</style>

