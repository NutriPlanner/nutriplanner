<template>
  <b-row class="np-component np-component--data-table-pagination mb-4">
    <b-col cols="auto">
      <b-pagination
        :value="page"
        :total-rows="totalRows"
        :per-page="limit"
        :aria-controls="`data-table-pagination-${_uid}`"
        @page-click="$emit('page-click', ...arguments)"
      />
    </b-col>

    <b-col cols="auto">
      <b-form-group
        v-slot="{ ariaDescribedby }"
        label="Por página"
        :label-for="`data-table-pagination-${_uid}-select-limit`"
        label-align-sm="right"
        label-size="md"
        label-cols-sm="auto"
        class="mb-0"
      >
        <b-input-group size="md">
          <b-form-select
            :id="`data-table-pagination-${_uid}-select-limit`"
            :value="limit"
            :aria-describedby="ariaDescribedby"
            :options="limitOptions"
            @input="$emit('update:limit', $event)"
          />
        </b-input-group>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "DataTablePaginationComponent",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    totalRows: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      limitOptions: [
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 25, text: "25" },
        { value: 50, text: "50" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
