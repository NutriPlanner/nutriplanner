<template>
    <b-badge
        variant="tertiary"
        class="np-component np-component--object-id-badge"
    >
        {{ value }}
    </b-badge>
</template>

<script>
export default {
    name  : "ObjectIdBadgeComponent",
    props : {
        value: {
            type     : String,
            required : true,
        },
    },
}
</script>

<style lang="scss" scoped>
.np-component--object-id-badge {
    word-break: break-all;
    white-space: normal;
    padding: 0.5em 0.7em;
    font-family: monospace;
}
</style>
