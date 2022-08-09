<template>
    <div class="np-page np-page--clients-put">
        <b-card no-body>
            <template #header>
                <CardHeader>Editar cliente</CardHeader>
            </template>

            <ClientHelpSection />

            <Tabs v-model="tabIndex">
                <b-tab title="Datos">
                    <ClientForm @submit="update" />
                </b-tab>

                <b-tab title="Objetivos">
                    <ClientGoals :client="client" />
                </b-tab>
            </Tabs>
        </b-card>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
    name: 'ClientsPutPage',

    data () {
        return {
            tabIndex: 0,
        }
    },

    async fetch() {
        await this.resetData()
        await this.fetchAction(this.$route.query.id)
    },

    computed: {
        ...mapFields('clientForm', {
            client: 'data',
        } ),
    },

    methods: {
        ...mapActions('clientForm', {
            resetData   : 'resetData',
            fetchAction : 'fetch',
            update      : 'update',
        } ),
    },
}
</script>

<style lang="scss" scoped></style>
