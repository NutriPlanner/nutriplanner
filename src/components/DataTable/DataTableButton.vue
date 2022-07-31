<template>
    <b-button v-bind="properties" @click="$emit('click', ...arguments)">
        {{ text }}
    </b-button>
</template>

<script>
export default {
    name     : 'DataTableButtonComponent',
    computed : {
        properties () {
            return {
                variant : 'outline-primary',
                ...this.$attrs,
                sise    : 'sm',
                class   : 'np-component--data-table-button',
            }
        },

        text () {
            return this.$slots.default
                ? this.$slots.default[0].text.toUpperCase()
                : ''
        },
    },
}
</script>

<style lang="scss" scoped>
.np-component--data-table-button {
  padding: 0 5px;
  font-size: 0.85rem;
}
</style>
