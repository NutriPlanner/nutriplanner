<template>
    <div class="np-component np-component--date-render tabular-nums">
        {{ moment.utc(value).local().format("DD-MM-YYYY") }}
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name  : 'DateRenderComponent',
    props : [ 'value' ],
    data () {
        return {
            moment,
        }
    },
}
</script>

<style lang="scss" scoped></style>
