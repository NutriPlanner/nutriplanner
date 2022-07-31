<template>
    <div class="np-component np-component--status-render">
        <b-row
            no-gutters
            align-v="center"
            class="np-component--status-render__row"
        >
            <b-col cols="auto">
                <div
                    class="np-component--status-render__dot"
                    :variant="$attrs.variant"
                />
            </b-col>

            <b-col cols="auto">
                <span class="np-component--status-render__title">{{
                    $attrs.title
                }}</span>
                <span class="np-component--status-render__description">({{ $attrs.description }})</span>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'StatusRenderComponent',
}
</script>

<style lang="scss" scoped>
.np-component--status-render {
  text-align: center;

  &__dot {
    height: 4px;
    width: 4px;
    border-radius: 50%;
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
