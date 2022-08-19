<template>
    <b-overlay
        :show="loading"
        :rounded="$attrs.rounded || true"
        :opacity="$attrs.opacity || 0.6"
        spinner-small
        spinner-variant="primary"
        class="mb-2"
    >
        <slot />
    </b-overlay>
</template>

<script>
export default {
    name  : 'OverlayComponent',
    props : {
        loading: {
            type     : Boolean,
            required : true,
        },
    },
}
</script>
