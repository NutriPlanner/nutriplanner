<template>
    <div>
        <b-card>
            <template #header>
                <CardHeader>Editar plan</CardHeader>
            </template>

            <PlanForm @submit="update" />
        </b-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PlansPutPage',
    data () {
        return {
            tabIndex: 0,
        }
    },

    async fetch() {
        await this.resetData()
        await this.fetchAction(this.$route.query.id)
    },

    methods: {
        ...mapActions('planForm', {
            resetData   : 'resetData',
            fetchAction : 'fetch',
            update      : 'update',
        } ),
    },
}
</script>
