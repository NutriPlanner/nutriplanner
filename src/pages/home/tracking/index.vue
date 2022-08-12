<template>
    <div class="np-page np-page--tracking">
        <b-card no-body>
            <template #header>
                <CardHeader>Seguimientos</CardHeader>
            </template>

            <Tabs>
                <b-tab title="Pendientes" no-body>
                    <b-card class="no-border">
                        <TrackingMaintainerPendings ref="maintainerPendings" />
                    </b-card>
                </b-tab>

                <b-tab title="Por cliente" no-body>
                    <TrackingHelpSection />

                    <Tabs v-model="tabIndex">
                        <b-tab title="Clientes">
                            <ClientList
                                ref="clientList"
                                @table-reload="onTableReload"
                                @show-tracking-list="onShowTrackingList"
                            />
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
export default {
    name: 'TrackingPage',

    data () {
        return {
            tabIndex            : 0,
            client              : {},
            existClientSelected : false,
        }
    },

    mounted () {
        this.$refs.maintainerPendings.reFetch()
        this.$refs.clientList.reFetch()
    },

    methods: {
        onTableReload () {
            this.client = {}
            this.existClientSelected = false

            setTimeout( () => {
                this.tabIndex = 0
            }, 100)
        },

        onShowTrackingList ( { item } ) {
            this.client = item
            this.existClientSelected = true

            this.$refs.maintainer.reFetch()
            
            setTimeout( () => {
                this.tabIndex = 1
            }, 100)
        },
    },
}
</script>

<style lang="scss" scoped></style>
