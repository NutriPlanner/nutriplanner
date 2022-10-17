<template>
    <div>
        <b-card no-body>
            <template #header>
                <CardHeader>Editar cliente</CardHeader>
            </template>

            <ClientHelpSection />

            <Tabs v-model="tabIndex">
                <b-tab title="Datos">
                    <ClientForm @submit="update" />
                </b-tab>

                <b-tab :disabled="!userHasRequiredLicensee">
                    <template #title>
                        <span>Objetivos <Licensee v-if="!userHasRequiredLicensee" :type="goalRequiredLicensee" /></span>
                    </template>

                    <ClientGoals v-if="userHasRequiredLicensee" :client="client" />
                </b-tab>
            </Tabs>
        </b-card>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import { feature, requiredLicensee } from '@/config/features'

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

        goalRequiredLicensee() {
            return requiredLicensee(feature.CLIENT_GOALS)
        },

        userHasRequiredLicensee() {
            return this.$loyalty.validate(this.goalRequiredLicensee)
        },
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
