<template>
    <div class="tabular-nums">
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
