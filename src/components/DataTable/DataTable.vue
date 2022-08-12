<template>
    <b-table
        :id="`data-table-${_uid}`"
        striped
        sticky-header
        borderless
        hover
        no-border-collapse
        responsive
        stacked="md"
        show-empty
        :bordered="true"
        :outlined="true"
        :fields="fields"
        :items="items"
        :sort-by="sortBy"
        :sort-desc="sortOrder"
        :empty-text="noResultsText"
        :empty-filtered-text="noResultsText"
        :per-page="limit"
        :busy="loading"
        class="np-component np-component--data-table mt-4"
        @sort-changed="onSortChanged"
    >
        <template v-for="field in fields" #[`cell(${field.key})`]="data">
            <slot :name="`cell(${field.key})`" v-bind="{ ...data }">
                {{ data.value }}
            </slot>
        </template>

        <template #table-busy>
            <div class="text-center text-primary my-2">
                <b-spinner class="align-middle" small />
            </div>
        </template>

        <template #empty="scope">
            <div class="text-muted text-center py-3">
                {{ scope.emptyText }}
            </div>
        </template>

        <template #emptyfiltered="scope">
            <div class="text-muted text-center py-3">
                {{ scope.emptyFilteredText }}
            </div>
        </template>
    </b-table>
</template>

<script>
export default {
    name  : 'DataTableComponent',
    props : {
        fields: {
            type     : Array,
            required : true,
        },
        items: {
            type     : Array,
            required : true,
        },
        sortBy: {
            type    : String,
            default : null,
        },
        sortOrder: {
            type    : Boolean,
            default : false,
        },
        limit: {
            type    : Number,
            default : 10,
        },
        loading: {
            type    : Boolean,
            default : false,
        },
    },
    data () {
        return {
            noResultsText: 'No hay resultados',
        }
    },
    methods: {
        onSortChanged (event) {
            if (this.sortBy !== event.sortBy)
                this.$emit('update:sort-by', event.sortBy)
            
            if (this.sortOrder !== event.sortDesc)
                this.$emit('update:sort-order', event.sortDesc)
        },
    },
}
</script>

<style lang="scss" scoped></style>
