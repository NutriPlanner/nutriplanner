<template>
    <b-badge variant="tertiary" :class="classNames.badge">
        {{ value }}
    </b-badge>
</template>

<script>
import cx from 'classnames'

export default {
    name  : "ObjectIdBadgeComponent",
    props : {
        value: {
            type     : String,
            required : true,
        },
    },
    computed: {
        classNames() {
            return {
                badge: cx(this.$style.badge, 'text-monospace'),
            }
        },
    },
}
</script>

<style lang="scss" module>
.badge {
    word-break: break-all;
    white-space: normal;
    padding: 0.5em 0.7em;
}
</style>
