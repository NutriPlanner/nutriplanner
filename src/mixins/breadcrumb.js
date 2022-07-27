export default {
  methods: {
    __setupBreadcrumb() {
      this.$store.dispatch("breadcrumb/setup");
    },
  },
};
