import _ from "lodash";
import { setFilterParam, setSortParam, setPageParam } from "@/utils/fetch";

export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    totalRows: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      sortBy: null,
      sortOrder: false,
      filter: "",
      filterOn: [],
      limit: 10,
      fetchParams: {
        sortBy: "",
        filter: "{}",
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },

    filterOptions() {
      return this.fields
        .filter((f) => f.filterable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  watch: {
    filter() {
      this.onFilter(this.filterOn, this.filter);
    },

    filterOn() {
      if (!_.isEmpty(this.filter)) {
        this.onFilter(this.filterOn, this.filter);
      }
    },

    sortBy() {
      this.onSort(this.sortBy, this.sortOrder);
    },

    sortOrder() {
      this.onSort(this.sortBy, this.sortOrder);
    },

    limit(newLimit, oldLimit) {
      this.onLimit(oldLimit, newLimit, this.page);
    },
  },
  mounted() {
    this.$emit("filters-changed", _.cloneDeep(this.fetchParams));
  },
  methods: {
    onFilter(columns, searchValue) {
      const filterColumns = !_.isEmpty(columns)
        ? columns
        : this.filterOptions.map((o) => o.value);

      this.fetchParams.filter = setFilterParam(filterColumns, searchValue);
      this.fetchParams.page = 1;
      this.$emit("filters-changed", _.cloneDeep(this.fetchParams));
    },

    onSort(sortBy, sortOrder) {
      this.fetchParams.sortBy = setSortParam(sortBy, sortOrder);
      this.fetchParams.page = 1;
      this.$emit("filters-changed", _.cloneDeep(this.fetchParams));
    },

    onLimit(oldLimit, newLimit, currentPage) {
      this.fetchParams.limit = newLimit;
      this.fetchParams.page = setPageParam(oldLimit, newLimit, currentPage);

      this.$emit("filters-changed", _.cloneDeep(this.fetchParams));
    },

    onPageClick(event, page) {
      event.preventDefault();

      this.fetchParams.page = page;
      this.$emit("filters-changed", _.cloneDeep(this.fetchParams));
    },

    reFetch() {
      this.$emit("filters-changed", _.cloneDeep(this.fetchParams));
    },
  },
};
