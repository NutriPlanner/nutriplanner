<template>
    <div class="np-component np-component--maintainer">
        <b-row class="mb-4" align-h="end" no-gutters>
            <b-col cols="auto">
                <b-button variant="outline-primary" @click="reFetch">
                    Recargar Lista
                </b-button>
            </b-col>

            <b-col cols="auto ml-2">
                <b-button @click="$emit('new-registry')">
                    Crear nuevo
                </b-button>
            </b-col>
        </b-row>

        <DataTableFilters
            :sort-by.sync="sortBy"
            :sort-order.sync="sortOrder"
            :filter.sync="filter"
            :filter-on.sync="filterOn"
            :sort-options="sortOptions"
            :filter-options="filterOptions"
        />

        <DataTable
            :fields="fieldsOptions"
            :items="items"
            :sort-by.sync="sortBy"
            :sort-order.sync="sortOrder"
            :limit="limit"
            :loading="loading"
        >
            <template v-for="field in fields" #[`cell(${field.key})`]="data">
                <slot v-if="field.key !== '__actions'" :name="`cell(${field.key})`" v-bind="{ ...data }">
                    <DataTableFieldRender :key="field.key" v-bind="{ ...data }" />
                </slot>

                <template v-else>
                    <slot :name="`cell(${field.key})`" v-bind="{ ...data }">
                        <MaintainerFieldActionRender
                            :data="data"
                            :show-delete-button="showDeleteButton"
                            @edit="$emit('edit-registry', $event)"
                            @delete="$emit('delete-registry', $event)"
                        />
                    </slot>
                </template>
            </template>
        </DataTable>

        <DataTablePagination
            :page="page"
            :total-rows="totalRows"
            :limit.sync="limit"
            @page-click="onPageClick"
        />
    </div>
</template>

<script>
import DataTableMixin from '@/mixins/dataTable'

export default {
    name   : 'MaintainerComponent',
    mixins : [ DataTableMixin ],
    props  : {
        showDeleteButton: {
            type     : Boolean,
            required : false,
            default  : true,
        },
    },
}
</script>

<style lang="scss" scoped></style>
