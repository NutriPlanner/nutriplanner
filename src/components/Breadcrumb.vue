<template>
  <div class="np-component np-component--breadcrumb">
    <b-breadcrumb :items="items" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BreadcrumbComponent",
  computed: {
    ...mapGetters({
      items: "breadcrumb/items",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
