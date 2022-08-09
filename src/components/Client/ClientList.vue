<template>
    <div class="np-component np-component--clients-list">
        <ReadonlyList
            ref="list"
            :fields="trackingsClientsFields"
            :items="items"
            :total-rows="totalRows"
            :page="page"
            :loading="loading"
            @filters-changed="fetchAction"
        >
            <template v-for="field in fields" #[`cell(${field.key})`]="data">
                <DateRender
                    v-if="field.key === 'birthday'"
                    :key="`date-${field.key}`"
                    :value="data.value"
                />

                <DataTableButton
                    v-else-if="field.key === '__actions'"
                    :key="`action-${field.key}`"
                    @click="$emit('show-tracking-list', data)"
                >
                    Mostrar
                </DataTableButton>

                <DataTableFieldRender
                    v-else
                    :key="`field-${field.key}`"
                    :data="data"
                    :field="field"
                />
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
            totalRows : 'data.totalRows',
            page      : 'data.page',
            loading   : 'loading',
        } ),

        ...mapGetters('clients', {
            fields: 'tableFields',
        } ),

        trackingsClientsFields() {
            return this.fields.map(f => {
                if (f.key === '__actions') {
                    return {
                        key      : '__actions',
                        label    : 'Seguimientos',
                        sortable : false,
                    }
                }

                return f
            } )
        },
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

<style lang="scss" scoped></style>
