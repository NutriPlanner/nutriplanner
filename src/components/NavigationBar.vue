<template>
  <b-navbar class="np-component np-component--navigation-bar" toggleable="md" sticky>
    <SidebarToggle target="sidebar" />

    <b-navbar-brand href="#">
      NutriPlanner
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse">
      <template #default="{ expanded }">
        <b-button v-if="expanded" size="sm" class="ml-auto" variant="primary">
          <i class="ri-menu-3-fill" />
        </b-button>
        <b-button v-else size="sm" class="ml-auto" variant="outline-primary">
          <i class="ri-menu-3-fill" />
        </b-button>
      </template>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item to="/profile">
            Preferencias
          </b-dropdown-item>
          <b-dropdown-item>
            Cerrar sesión
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBarComponent'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/globals/mainColors';

.np-component--navigation-bar {
  background-color: $background-color;

  .navbar-toggler {
    border: none;
    padding: 0;
  }
}
</style>
