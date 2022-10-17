<template>
    <div>
        <ReadonlyList
            ref="list"
            :fields="fields"
            :items="items"
            :total-rows="totalRows"
            :page.sync="page"
            :loading="loading"
            @filters-changed="fetchData"
        >
            <template v-for="field in fields" #[`cell(${field.key})`]="data">
                <template v-if="field.key === '__actions'">
                    <slot :name="`cell(${field.key})`" v-bind="{ ...data }" />
                </template>

                <DataTableFieldRender v-else :key="`field-${field.key}`" v-bind="{ ...data }" />
            </template>
        </ReadonlyList>
    </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ClientsListComponents',

    computed: {
        ...mapMultiRowFields('clients', {
            items: 'data.clients',
        } ),

        ...mapFields('clients', {
            totalRows : 'data.totalResults',
            page      : 'data.page',
            loading   : 'loading',
        } ),

        ...mapGetters('clients', {
            fields: 'tableFields',
        } ),
    },

    methods: {
        ...mapActions('clients', {
            fetchAction: 'fetch',
        } ),

        fetchData (params) {
            this.$emit('table-reload')
            this.fetchAction(params)
        },

        reFetch() {
            if (this.$refs.list)
                this.$refs.list.reFetch()
        },
    },
}
</script>
