<template>
    <div class="np-page np-page--tracking">
        <b-card no-body>
            <template #header>
                <CardHeader>Seguimientos</CardHeader>
            </template>

            <TrackingHelpPendingsSection v-if="!userHasRequiredPendingsLicensee" />

            <Tabs>
                <b-tab no-body :disabled="!userHasRequiredPendingsLicensee">
                    <template #title>
                        <span>Pendientes <Licensee v-if="!userHasRequiredPendingsLicensee" :type="pendingsRequiredLicensee" /></span>
                    </template>

                    <b-card v-if="userHasRequiredPendingsLicensee" class="no-border">
                        <TrackingMaintainerPendings ref="maintainerPendings" />
                    </b-card>
                </b-tab>

                <b-tab title="Por cliente" no-body>
                    <TrackingHelpByClientSection />

                    <Tabs v-model="tabIndex">
                        <b-tab title="Clientes">
                            <ClientList
                                ref="clientList"
                                @table-reload="onTableReload"
                            >
                                <template #cell(__actions)="data">
                                    <DataTableButton @click="onShowTrackingList(data)">
                                        Mostrar
                                    </DataTableButton>
                                </template>
                            </ClientList>
                        </b-tab>

                        <b-tab title="Seguimientos" sticky-column :disabled="!existClientSelected">
                            <TrackingMaintainerPerClient ref="maintainer" :client="client" />
                        </b-tab>
                    </Tabs>
                </b-tab>
            </Tabs>
        </b-card>
    </div>
</template>

<script>
import { feature, requiredLicensee } from '@/config/features'

export default {
    name: 'TrackingPage',

    data () {
        return {
            tabIndex            : 0,
            client              : {},
            existClientSelected : false,
        }
    },

    computed: {
        pendingsRequiredLicensee() {
            return requiredLicensee(feature.TRACKINGS_PENDINGS)
        },

        userHasRequiredPendingsLicensee() {
            return this.$loyalty.validate(this.pendingsRequiredLicensee)
        },
    },

    mounted () {
        if (this.userHasRequiredPendingsLicensee)
            this.$refs.maintainerPendings.reFetch()
            
        this.$refs.clientList.reFetch()
    },

    methods: {
        onTableReload () {
            this.client = {}
            this.existClientSelected = false

            setTimeout(() => {
                this.tabIndex = 0
            }, 100)
        },

        onShowTrackingList ( { item } ) {
            this.client = item
            this.existClientSelected = true
            
            setTimeout(() => {
                this.tabIndex = 1
                this.$refs.maintainer.reFetch()
            }, 100)
        },
    },
}
</script>

<style lang="scss" scoped></style>
