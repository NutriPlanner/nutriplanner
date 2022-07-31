<template>
    <div class="np-component np-component--clients-list">
        <ReadonlyList
            :fields="fields"
            :items="items"
            :total-rows="totalRows"
            :page="page"
            :loading="loading"
            @filters-changed="fetchData"
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
import clientConfig from '@/config/clients/fields'

const fields = clientConfig.getFields( [
    'herba_id',
    'name',
    'last_name',
    'rut',
    'birthday',
    'address',
    'phone',
    'email',
] )

export default {
    name: 'ClientsListComponents',
    data () {
        return {
            fields: [
                ...fields,
                {
                    key      : '__actions',
                    label    : 'Seguimientos',
                    sortable : false,
                },
            ],
        }
    },
    computed: {
        items () {
            return this.$store.state.clients.list
        },
        totalRows () {
            return this.$store.state.clients.totalResults
        },
        page () {
            return this.$store.state.clients.page
        },
        loading () {
            return this.$store.state.clients.loading
        },
    },
    methods: {
        fetchData (params) {
            this.$emit('table-reload')
            this.$store.dispatch('clients/fetch', params)
        },
    },
}
</script>

<style lang="scss" scoped></style>
