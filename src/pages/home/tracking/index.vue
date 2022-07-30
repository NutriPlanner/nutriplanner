<template>
  <div class="np-page np-page--tracking">
    <b-card no-body>
      <TrackingHelpSection />

      <Tabs v-model="tabIndex">
        <template>
          <b-tab title="Clientes">
            <ClientList
              @table-reload="onTableReload"
              @show-tracking-list="okShowTrackingList"
            />
          </b-tab>

          <b-tab title="Seguimientos" :disabled="!existClientSelected">
            <TrackingMaintainer />
          </b-tab>
        </template>
      </Tabs>
    </b-card>
  </div>
</template>

<script>
// import { FULLFILLED } from "@/utils/responseStatus";

export default {
  name: "TrackingPage",
  data() {
    return {
      tabIndex: 0,
    };
  },
  computed: {
    existClientSelected() {
      return this.$store.state.trackings.selectedClientId;
    },
  },
  watch: {
    existClientSelected(value) {
      setTimeout(() => {
        this.tabIndex = value ? 1 : 0;
      }, 100);
    },
  },
  methods: {
    onTableReload() {
      this.$store.dispatch("trackings/setClientId", null);
    },

    okShowTrackingList({ item }) {
      this.$store.dispatch("trackings/setClientId", item.id);

      // fetch trackings
      // const { status } = await this.$store.dispatch("tracking/fetch", params);

      // if (status === FULLFILLED) {
      //   this.trackingTabDisabled = false;
      // }
    },
  },
};
</script>

<style lang="scss" scoped></style>
