<template>
  <b-tabs
    :value="value"
    pills
    card
    class="np-component np-component--tabs"
    @input="$emit('input', $event)"
  >
    <slot></slot>
  </b-tabs>
</template>

<script>
export default {
  name: "TabsComponent",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped></style>
