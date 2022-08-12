<template>
    <div class="np-component np-component--data-select">
        <b-form-input
            :value="search"
            type="text"
            placeholder="Escribe para empezar a buscar..."
            class="mb-2"
            @input="$emit('update:search', $event)"
        />

        <Overlay :loading="loading">
            <b-form-select
                :id="$attrs.id"
                :value="value"
                :options="selectOptions"
                :state="state"
                :aria-describedby="$attrs['aria-describedby']"
                @input="$emit('input', $event)"
            >
                <template v-for="slot in Object.keys($scopedSlots)" #[slot]="data">
                    <slot :name="`${slot}`" v-bind="{ ...data }" />
                </template>
            </b-form-select>
        </Overlay>
    </div>
</template>

<script>
export default {
    name  : 'DataSelectComponent',
    props : {
        search: {
            type     : String,
            required : false,
            default  : '',
        },
        value: {
            type     : String,
            required : false,
            default  : '',
        },
        selectOptions: {
            type     : Array,
            required : false,
            default  : () => [],
        },
        state: {
            type     : Boolean,
            required : false,
            default  : true,
        },
        loading: {
            type     : Boolean,
            required : false,
            default  : false,
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
