<template>
    <div>
        <b-card>
            <template #header>
                <CardHeader>Registrar seguimiento</CardHeader>
            </template>

            <TrackingForm :client="client" @submit="create" />
        </b-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'TrackingPostPage',

    data() {
        return {
            client: {},
        }
    },

    async fetch() {
        await this.resetData()

        const response  = await this.fetchClient(this.$route.query.clientId)
        this.client = response.data
    },

    methods: {
        ...mapActions('trackings/form', {
            resetData : 'resetData',
            create    : 'create',
        } ),

        ...mapActions('clientForm', {
            fetchClient: 'fetch',
        } ),
    },
}
</script>
