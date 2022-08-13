<template>
    <div class="np-component np-component--data-table-field-render tabular-nums">
        <template v-if="field.type === OBJECT_ID">
            <ObjectIdBadge v-if="$attrs.value" :value="$attrs.value" />
        </template>

        <template v-else-if="field.type === DATE">
            <DateRender v-if="$attrs.value" :key="`date-${field.key}`" :value="$attrs.value" />
        </template>

        <template v-else>
            {{ $attrs.value }}
        </template>
    </div>
</template>

<script>
import { OBJECT_ID, DATE } from '@/utils/fieldsTypes'

export default {
    name  : 'DataTableFieldRenderComponent',
    props : {
        item: {
            type     : Object,
            required : true,
        },

        field: {
            type     : Object,
            required : true,
        },
    },
    data () {
        return {
            OBJECT_ID,
            DATE,
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
