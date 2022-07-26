<template>
  <b-card>
    <b-row>
      <b-col v-if="sortOptions.length > 0" sm="12" lg="6" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="Ordenar"
          label-for="sort-by-select"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              :value="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
              @input="$emit('update:sortBy', $event)"
            >
              <template #first>
                <option :value="null">
                  -- sin selección --
                </option>
              </template>
            </b-form-select>

            <b-form-select
              :value="sortOrder"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
              @input="$emit('update:sortOrder', $event)"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="6" class="my-1">
        <b-form-group
          label="Filtro"
          label-for="filter-input"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              :value="filter"
              type="search"
              placeholder="Escribe para filtrar..."
              @input="$emit('update:filter', $event)"
            />

            <b-input-group-append>
              <b-button :disabled="!filter" @click="$emit('update:filter', '')">
                Limpiar
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col class="ml-auto" />

      <b-col v-if="filterOptions.length > 0" sm="12" lg="6" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="Filtrar por"
          description="Dejar todas las opciones desactivadas para poder filtrar por todos los campos"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            :value="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
            @input="$emit('update:filterOn', $event)"
          >
            <b-form-checkbox v-for="op in filterOptions" :key="op.value" :value="op.value">
              {{ op.text }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: 'MaintainerFilterComponent',
  props: {
    sortBy: {
      type: String,
      default: null
    },
    sortOrder: {
      type: Boolean,
      default: false
    },
    filter: {
      type: String,
      default: ''
    },
    filterOn: {
      type: Array,
      default: () => []
    },
    sortOptions: {
      type: Array,
      default: () => []
    },
    filterOptions: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
