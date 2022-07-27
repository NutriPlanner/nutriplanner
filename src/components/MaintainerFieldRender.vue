<template>
  <div class="np-component np-component--maintainer-field-render">
    <template v-if="$attrs.data.field.type === OBJECT_ID">
      <b-badge
        v-if="$attrs.data.value"
        variant="tertiary"
        class="np-component--maintainer-field-render__object-id"
      >
        {{ $attrs.data.value }}
      </b-badge>
    </template>

    <template v-else>
      {{ $attrs.data.value }}
    </template>
  </div>
</template>

<script>
import { OBJECT_ID } from "@/utils/fieldsTypes";

export default {
  name: "MaintainerFieldRenderComponent",
  data() {
    return {
      OBJECT_ID,
    };
  },
};
</script>

<style lang="scss" scoped>
.np-component--maintainer-field-render {
  &__object-id {
    word-break: break-all;
    white-space: normal;
  }
}
</style>
