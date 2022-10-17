<template>
    <b-tabs
        :value="value"
        pills
        card
        @input="$emit('input', $event)"
    >
        <slot />
    </b-tabs>
</template>

<script>
export default {
    name  : 'TabsComponent',
    props : {
        value: {
            type    : Number,
            default : 0,
        },
    },
}
</script>
