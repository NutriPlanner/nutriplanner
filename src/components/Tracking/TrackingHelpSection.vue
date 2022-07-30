<template>
  <b-card no-body class="mb-0 border-0">
    <b-card-header class="p-0" role="tab">
      <b-button
        class="text-left"
        variant="link"
        block
        @click="collapsed = !collapsed"
      >
        <i class="ri-question-line"></i> Ayuda:
        <span class="no-transform">Seguimiento está deshabilitado</span>.
      </b-button>
    </b-card-header>

    <b-collapse
      :visible="!collapsed"
      :accordion="`help-${_uid}`"
      role="tabpanel"
    >
      <b-card-body>
        <b-card-text>
          <p class="m-0">
            Para poder habilitar la lista de seguimientos, primero debe buscar
            un cliente y luego presionar sobre el botón de
            <code>MOSTRAR</code> en la columna de <code>Seguimientos</code>.
          </p>
        </b-card-text>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: "TrackingHelpSectionComponent",
  data() {
    return {
      collapsed: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
