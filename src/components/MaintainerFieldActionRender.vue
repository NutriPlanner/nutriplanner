<template>
  <div class="np-component np-component--maintainer-field-action-render">
    <b-button
      size="sm"
      variant="outline-primary"
      class="np-component--maintainer-field-action-render__button"
      @click="$emit('edit', data.item)"
    >
      Editar
    </b-button>

    <b-button
      size="sm"
      variant="outline-danger"
      class="np-component--maintainer-field-action-render__button"
      @click="onDelete"
    >
      Eliminar
    </b-button>
  </div>
</template>

<script>
export default {
  name: "MaintainerFieldActionRenderComponent",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onDelete() {
      const confirmed = await this.$bvModal.msgBoxConfirm(
        "¿Está seguro de deseas eliminar este registro? Esta operación no es reversible.",
        {
          title: "Confirmar eliminación",
          okVariant: "danger",
          okTitle: "Eliminar",
          cancelVariant: "outline-primary",
          cancelTitle: "Cancelar",
        }
      );

      if (confirmed) {
        this.$emit("delete", this.data.item.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.np-component--maintainer-field-action-render__button {
  padding: 0 5px;
}
</style>
