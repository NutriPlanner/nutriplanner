<template>
    <div class="np-page np-page--tracking">
        <b-card no-body>
            <TrackingHelpSection />

            <Tabs v-model="tabIndex">
                <b-tab title="Clientes">
                    <ClientList
                        @table-reload="onTableReload"
                        @show-tracking-list="okShowTrackingList"
                    />
                </b-tab>

                <b-tab title="Seguimientos" :disabled="!existClientSelected">
                    <TrackingMaintainer />
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
            tabIndex: 0,
        }
    },
    computed: {
        existClientSelected () {
            return this.$store.state.trackings.selectedClientId
        },
    },
    watch: {
        existClientSelected (value) {
            setTimeout( () => {
                this.tabIndex = value ? 1 : 0
            }, 100)
        },
    },
    methods: {
        onTableReload () {
            this.$store.dispatch('trackings/setClient', {
                id       : null,
                fullName : null,
                rut      : null,
                email    : null,
                phone    : null,
            } )
        },

        okShowTrackingList ( { item } ) {
            this.$store.dispatch('trackings/setClient', {
                id       : item.id,
                fullName : `${item.name} ${item.last_name}`,
                rut      : item.rut,
                email    : item.email,
                phone    : item.phone,
            } )
        },
    },
}
</script>

<style lang="scss" scoped></style>
