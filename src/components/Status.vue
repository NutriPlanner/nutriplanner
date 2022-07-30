<template>
  <div class="np-component np-component--status">
    <b-row no-gutters align-h="center" align-v="center">
      <b-col cols="auto">
        <div class="np-component--status__dot" :variant="$attrs.variant"></div>
      </b-col>

      <b-col cols="auto">
        <span class="np-component--status__title">{{ $attrs.title }}</span>
        <span class="np-component--status__description"
          >({{ $attrs.description }})</span
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "StatusComponent",
};
</script>

<style lang="scss" scoped>
.np-component--status {
  text-align: center;

  &__dot {
    height: 4px;
    width: 4px;
    border-radius: 50%;
    margin-left: -14px;
    margin-right: 10px;

    &[variant="success"] {
      background-color: var(--success);
    }

    &[variant="danger"] {
      background-color: var(--danger);
    }

    &[variant="primary"] {
      background-color: var(--primary);
    }

    &[variant="warning"] {
      background-color: var(--warning);
    }
  }

  &__title {
    display: block;
    font-size: 0.8rem;
  }

  &__description {
    display: block;
    font-size: 0.6rem;
  }
}
</style>
