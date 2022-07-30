<template>
  <div class="np-page np-page--clients">
    <b-card>
      <Maintainer
        :fields="fields"
        :items="items"
        :total-rows="totalRows"
        :page="page"
        :loading="loading"
        @new-registry="onNewRegistry"
        @edit-registry="onEditRegistry"
        @delete-registry="onDeleteRegistry"
        @filters-changed="fetchData"
      />
    </b-card>
  </div>
</template>

<script>
import clientConfig from "@/config/clients/fields";

const fields = clientConfig.getFields([
  "herba_id",
  "name",
  "last_name",
  "rut",
  "birthday",
  "address",
  "phone",
  "email",
]);

export default {
  name: "ClientsPage",
  data() {
    return {
      fields: [
        ...fields,
        {
          key: "__actions",
          label: "Acciones",
          sortable: false,
        },
      ],

      currentParamsStatus: {},
    };
  },
  computed: {
    items() {
      return this.$store.state.clients.list;
    },
    totalRows() {
      return this.$store.state.clients.totalResults;
    },
    page() {
      return this.$store.state.clients.page;
    },
    loading() {
      return this.$store.state.clients.loading;
    },
  },
  methods: {
    fetchData(params) {
      this.currentParamsStatus = params;
      this.$store.dispatch("clients/fetch", params);
    },
    onNewRegistry() {
      this.$router.push({ name: "home-clients-post" });
    },
    onEditRegistry(data) {
      this.$store.dispatch("clients/set", { update: data });
      this.$router.push({ name: "home-clients-put" });
    },
    async onDeleteRegistry(id) {
      await this.$store.dispatch("clients/delete", id);
      this.$store.dispatch("clients/fetch", this.currentParamsStatus);
    },
  },
};
</script>

<style lang="scss" scoped></style>
