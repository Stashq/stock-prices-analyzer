<template>
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand href="#">Stock Dashboard</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>


      <!-- Right aligned nav items -->
      
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
          <b-dropdown-item href="#">PL</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.btn-secondary {
    background-color: inherit;
    border-color: transparent;
}

/deep/ #my-modal > .modal-dialog > .modal-content > .modal-header {
  color: black;
}
</style>

