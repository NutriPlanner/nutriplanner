<template>
  <div class="np-page np-page--clients">
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
  </div>
</template>

<script>
import { OBJECT_ID } from "@/utils/fieldsTypes";

export default {
  name: "ClientsPage",
  data() {
    return {
      fields: [
        {
          key: "herba_id",
          label: "HerbaID",
          sortable: false,
          filterable: true,
          type: OBJECT_ID,
          tdClass: "align-middle",
        },
        {
          key: "name",
          label: "Nombre",
          sortable: true,
          filterable: true,
        },
        {
          key: "last_name",
          label: "Apellido",
          sortable: true,
          filterable: true,
        },
        {
          key: "rut",
          label: "Rut",
          sortable: true,
          filterable: true,
        },
        {
          key: "birthday",
          label: "Fecha Nacimiento",
          sortable: true,
          filterable: true,
        },
        {
          key: "address",
          label: "Dirección",
          sortable: true,
          filterable: true,
        },
        {
          key: "phone",
          label: "Teléfono",
          sortable: true,
          filterable: true,
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          filterable: true,
        },
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
  beforeMount() {
    this.__setupBreadcrumb();
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
