<template>
  <div class="np-page np-page--clients-post">
    <b-card title="Agregar cliente">
      <b-card-text>
        <ClientForm :form-initial-data="formInitialData" @submit="onSubmit" />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { FULLFILLED } from "@/utils/responseStatus";

const formInitialData = {
  herba_id: "",
  name: "",
  last_name: "",
  rut: "",
  birthday: "",
  address: "",
  phone: "",
  email: "",
};

export default {
  name: "ClientsPostPage",
  data() {
    return {
      formInitialData,
    };
  },
  beforeMount() {
    this.__setupBreadcrumb();
  },
  methods: {
    async onSubmit({ data, resetForm }) {
      const { status } = await this.$store.dispatch("clients/create", data);

      if (status === FULLFILLED) {
        resetForm(formInitialData);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
