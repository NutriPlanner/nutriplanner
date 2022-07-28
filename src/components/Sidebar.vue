<template>
  <div class="np-component np-component--sidebar">
    <b-sidebar :id="target" backdrop shadow no-header>
      <div class="px-3 py-4">
        <b-nav vertical pills>
          <b-nav-item
            v-for="({ text }, name) in routes"
            :key="name"
            :to="{ name }"
            exact
            exact-active-class="active"
          >
            {{ text }}
          </b-nav-item>
        </b-nav>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import Routes from "@/config/routes";

export default {
  name: "SidebarComponent",
  props: {
    target: {
      type: String,
      default: "sidebar",
    },
  },
  data() {
    return {
      Routes,
    };
  },
  computed: {
    routes() {
      return Object.entries(this.Routes)
        .filter(([, { show }]) => show !== false)
        .reduce((acc, route) => {
          acc[route[0]] = route[1];
          return acc;
        }, {});
    },
  },
};
</script>

<style lang="scss" scoped></style>
