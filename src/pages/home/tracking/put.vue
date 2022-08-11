<template>
    <div class="np-page np-page--tracking-put">
        <b-card>
            <template #header>
                <CardHeader>Editar seguimiento</CardHeader>
            </template>

            <TrackingForm :client="client" :client-goal="clientGoal" @submit="update" />
        </b-card>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
    name: 'TrackingPutPage',

    data() {
        return {
            client     : {},
            clientGoal : null,
        }
    },

    async fetch() {
        await this.resetData()
        await this.fetchAction(this.$route.query.id)

        let response  = await this.fetchClient(this.clientId)
        this.client = response.data

        response = await this.getClientGoal(this.goalId || '')
        this.clientGoal = response.data
    },

    computed: {
        ...mapFields('trackings/form', {
            clientId : 'data.client',
            goalId   : 'data.goal',
        } ),
    },

    methods: {
        ...mapActions('trackings/form', {
            resetData   : 'resetData',
            fetchAction : 'fetch',
            update      : 'update',
        } ),

        ...mapActions('clientForm', {
            fetchClient: 'fetch',
        } ),

        ...mapActions('clientGoalForm', {
            getClientGoal: 'get',
        } ),
    },
}
</script>

<style lang="scss" scoped></style>
