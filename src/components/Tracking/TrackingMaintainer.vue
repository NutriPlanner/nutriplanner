<template>
  <div class="np-component np-component--tracking-maintainer">
    <Maintainer
      ref="maintainer"
      :fields="fields"
      :items="items"
      :total-rows="totalRows"
      :page="page"
      :loading="loading"
      @new-registry="onNewRegistry"
      @edit-registry="onEditRegistry"
      @delete-registry="onDeleteRegistry"
      @filters-changed="fetchData"
    >
      <template #cell(status)="data">
        <Status
          :title="data.value"
          :description="data.value === 'PENDING' ? 'PENDIENTE' : 'FINALIZADO'"
          :variant="data.value === 'PENDING' ? 'warning' : 'success'"
        />
      </template>
    </Maintainer>
  </div>
</template>

<script>
import trackingConfig from "@/config/tracking/fields";

const fields = trackingConfig.getFields(["id", "subject", "status"]);

export default {
  name: "TrackingMaintainerComponents",
  data() {
    return {
      fields: [
        ...fields,
        {
          key: "__actions",
          label: "Acción",
          sortable: false,
          thStyle: "width: 125px",
          tdClass: "align-middle",
        },
      ],
    };
  },
  computed: {
    items() {
      return this.$store.state.trackings.list;
    },
    totalRows() {
      return this.$store.state.trackings.totalResults;
    },
    page() {
      return this.$store.state.trackings.page;
    },
    loading() {
      return this.$store.state.trackings.loading;
    },
    selectedClientId() {
      return this.$store.state.trackings.selectedClientId;
    },
  },
  watch: {
    selectedClientId() {
      this.$refs.maintainer.reFetch();
    },
  },
  methods: {
    fetchData(params) {
      this.$store.dispatch("trackings/fetch", params);
    },

    onNewRegistry(data) {},

    onEditRegistry(data) {},

    onDeleteRegistry(data) {},
  },
};
</script>

<style lang="scss" scoped></style>
