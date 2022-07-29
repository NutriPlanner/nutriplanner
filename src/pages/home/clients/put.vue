<template>
  <div class="np-page np-page--clients-put">
    <b-card title="Editar cliente">
      <b-card-text>
        <ClientForm :form-initial-data="formInitialData" @submit="onSubmit" />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "ClientsPutPage",
  data() {
    return {
      formInitialData: {},
    };
  },
  beforeMount() {
    this.formInitialData = this.$store.state.clients.update;

    if (_.isEmpty(this.formInitialData) || !this.formInitialData.id) {
      this.$router.push({ name: "home-clients" });
    }
  },
  methods: {
    async onSubmit({ data }) {
      await this.$store.dispatch("clients/update", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
