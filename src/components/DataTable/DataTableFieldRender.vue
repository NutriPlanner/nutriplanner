<template>
    <div class="np-component np-component--data-table-field-render tabular-nums">
        <template v-if="$attrs.data.field.type === OBJECT_ID">
            <ObjectIdBadge v-if="$attrs.data.value" :value="$attrs.data.value" />
        </template>

        <template v-else>
            {{ $attrs.data.value }}
        </template>
    </div>
</template>

<script>
import { OBJECT_ID } from '@/utils/fieldsTypes'

export default {
    name: 'DataTableFieldRenderComponent',
    data () {
        return {
            OBJECT_ID,
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
