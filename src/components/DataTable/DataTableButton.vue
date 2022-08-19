<template>
    <b-button
        :class="classNames.button"
        v-bind="{
            variant: 'outline-primary',
            ...$attrs
        }"
        @click="$emit('click', ...arguments)"
    >
        <i v-if="$attrs.icon" :class="$attrs.icon" /> {{ text }}
    </b-button>
</template>

<script>
export default {
    name     : 'DataTableButtonComponent',
    computed : {
        classNames() {
            return {
                button: this.$style.button,
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

<style lang="scss" module>
.button {
    padding: 0 5px;
    font-size: 0.85rem;
}
</style>
