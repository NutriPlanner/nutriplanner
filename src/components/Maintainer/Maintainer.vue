<template>
  <div class="np-component np-component--maintainer">
    <b-row class="mb-4" align-h="end" no-gutters>
      <b-col cols="auto">
        <b-button variant="outline-primary" @click="reFetch">
          Recargar Lista
        </b-button>
      </b-col>

      <b-col cols="auto ml-2">
        <b-button @click="$emit('new-registry')"> Crear nuevo </b-button>
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
      :fields="fields"
      :items="items"
      :sort-by.sync="sortBy"
      :sort-order.sync="sortOrder"
      :limit="limit"
      :loading="loading"
    >
      <template v-for="field in fields" #[`cell(${field.key})`]="data">
        <slot
          v-if="field.key !== '__actions'"
          :name="`cell(${field.key})`"
          v-bind="{ ...data }"
        >
          <DataTableFieldRender :key="field.key" :data="data" :field="field" />
        </slot>

        <!-- eslint-disable-next-line vue/valid-v-for -->
        <MaintainerFieldActionRender
          v-else
          :data="data"
          @edit="$emit('edit-registry', $event)"
          @delete="$emit('delete-registry', $event)"
        />
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
import DataTableMixin from "@/mixins/dataTable";

export default {
  name: "MaintainerComponent",
  mixins: [DataTableMixin],
};
</script>

<style lang="scss" scoped></style>
