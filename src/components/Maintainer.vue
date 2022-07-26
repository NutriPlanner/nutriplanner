<template>
  <div class="np-component np-component--maintainer">
    <b-row class="mb-4" align-h="end">
      <b-col cols="auto">
        <b-button @click="$emit('new-registry')">
          Crear nuevo
        </b-button>
      </b-col>
    </b-row>

    <MaintainerFilters
      :sort-by.sync="sortBy"
      :sort-order.sync="sortOrder"
      :filter.sync="filter"
      :filter-on.sync="filterOn"
      :sort-options="sortOptions"
      :filter-options="filterOptions"
    />

    <b-table
      :id="`maintainer-${_uid}`"
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
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortOrder"
      :empty-text="noResultsText"
      :empty-filtered-text="noResultsText"
      :per-page="limit"
      :busy="loading"
      class="mt-4"
    >
      <template v-for="field in fields" #[`cell(${field.key})`]="data">
        <MaintainerFieldRender
          v-if="field.key !== '__actions'"
          :key="field.key"
          :data="data"
          :field="field"
        />

        <!-- eslint-disable-next-line vue/valid-v-for -->
        <MaintainerFieldActionRender
          v-else
          :data="data"
          @edit="$emit('edit-registry', $event)"
          @delete="$emit('delete-registry', $event)"
        />
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

    <b-row class="mb-4">
      <b-col cols="auto">
        <b-pagination
          :value="page"
          :total-rows="totalRows"
          :per-page="limit"
          :aria-controls="`maintainer-${_uid}`"
          @page-click="onPageClick"
        />
      </b-col>

      <b-col cols="auto">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="Por página"
          :label-for="`maintainer-${_uid}-select-limit`"
          label-align-sm="right"
          label-size="md"
          label-cols-sm="auto"
          class="mb-0"
        >
          <b-input-group size="md">
            <b-form-select
              :id="`maintainer-${_uid}-select-limit`"
              v-model="limit"
              :aria-describedby="ariaDescribedby"
              :options="limitOptions"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { setFilterParam, setSortParam, setPageParam } from '@/utils/fetch'

export default {
  name: 'MaintainerComponent',
  props: {
    fields: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    totalRows: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      sortBy: null,
      sortOrder: false,
      filter: '',
      filterOn: [],
      noResultsText: 'No hay resultados',
      limit: 10,
      limitOptions: [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 25, text: '25' },
        { value: 50, text: '50' }
      ],
      fetchParams: {
        sortBy: '',
        filter: {},
        limit: 10,
        page: 1
      }
    }
  },
  computed: {
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },

    filterOptions () {
      return this.fields
        .filter(f => f.filterable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  },
  watch: {
    filter () {
      this.onFilter(this.filterOn, this.filter)
    },

    filterOn () {
      if (!_.isEmpty(this.filter)) {
        this.onFilter(this.filterOn, this.filter)
      }
    },

    sortBy () {
      this.onSort(this.sortBy, this.sortOrder)
    },

    sortOrder () {
      this.onSort(this.sortBy, this.sortOrder)
    },

    limit (newLimit, oldLimit) {
      this.onLimit(oldLimit, newLimit, this.page)
    }
  },
  mounted () {
    this.$emit('filters-changed', _.cloneDeep(this.fetchParams))
  },
  methods: {
    onFilter (columns, searchValue) {
      const filterColumns = !_.isEmpty(columns) ? columns : this.filterOptions.map(o => o.value)

      this.fetchParams.filter = setFilterParam(filterColumns, searchValue)
      this.fetchParams.page = 1
      this.$emit('filters-changed', _.cloneDeep(this.fetchParams))
    },

    onSort (sortBy, sortOrder) {
      this.fetchParams.sortBy = setSortParam(sortBy, sortOrder)
      this.fetchParams.page = 1
      this.$emit('filters-changed', _.cloneDeep(this.fetchParams))
    },

    onLimit (oldLimit, newLimit, currentPage) {
      this.fetchParams.limit = newLimit
      this.fetchParams.page = setPageParam(oldLimit, newLimit, currentPage)

      this.$emit('filters-changed', _.cloneDeep(this.fetchParams))
    },

    onPageClick (event, page) {
      event.preventDefault()

      this.fetchParams.page = page
      this.$emit('filters-changed', _.cloneDeep(this.fetchParams))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
