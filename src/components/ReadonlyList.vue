<template>
    <div>
        <b-row class="mb-4" align-h="end" no-gutters>
            <b-col cols="auto">
                <b-button variant="outline-primary" @click="reFetch">
                    Recargar Lista
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
            <template v-for="field in fieldsOptions" #[`cell(${field.key})`]="data">
                <slot :name="`cell(${field.key})`" v-bind="{ ...data }">
                    <DataTableFieldRender :key="field.key" v-bind="{ ...data }" />
                </slot>
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
    name   : 'ReadonlyListComponent',
    mixins : [ DataTableMixin ],
}
</script>
