<template>
    <div class="np-component np-component--tracking-maintainer">
        <TrackingFormClientInfo class="mb-4" />

        <Maintainer
            ref="maintainer"
            :fields="fields"
            :items="items"
            :total-rows="totalRows"
            :page="page"
            :loading="loading"
            :default-sort-config="{ sortBy: 'date', sortOrder: true }"
            @new-registry="onNewRegistry"
            @edit-registry="onEditRegistry"
            @delete-registry="onDeleteRegistry"
            @filters-changed="fetchData"
        >
            <template #cell(status)="data">
                <StatusRender
                    :title="data.value"
                    :description="data.value === 'PENDING' ? 'PENDIENTE' : 'FINALIZADO'"
                    :variant="data.value === 'PENDING' ? 'warning' : 'success'"
                />
            </template>

            <template #cell(date)="data">
                <DateRender :value="data.value" />
            </template>
        </Maintainer>
    </div>
</template>

<script>
import moment from 'moment'
import trackingConfig from '@/config/tracking/fields'

const fields = trackingConfig.getFields( [ 'id', 'subject', 'status', 'date' ] )

export default {
    name: 'TrackingMaintainerComponents',
    data () {
        return {
            moment,

            fields: [
                ...fields,
                {
                    key      : '__actions',
                    label    : 'Acción',
                    sortable : false,
                    thStyle  : 'width: 125px',
                    tdClass  : 'align-middle',
                },
            ],
        }
    },
    computed: {
        items () {
            return this.$store.state.trackings.list
        },
        totalRows () {
            return this.$store.state.trackings.totalResults
        },
        page () {
            return this.$store.state.trackings.page
        },
        loading () {
            return this.$store.state.trackings.loading
        },
        selectedClientId () {
            return this.$store.state.trackings.selectedClientId
        },
    },
    watch: {
        selectedClientId () {
            this.$refs.maintainer.reFetch()
        },
    },
    methods: {
        fetchData (params) {
            this.$store.dispatch('trackings/fetch', params)
        },
        onNewRegistry () {
            this.$router.push( { name: 'home-tracking-post' } )
        },
        onEditRegistry (data) {
            this.$store.dispatch('trackings/set', { update: data } )
            this.$router.push( { name: 'home-tracking-put' } )
        },
        async onDeleteRegistry (id) {
            await this.$store.dispatch('trackings/delete', id)
            this.$refs.maintainer.reFetch()
        },
    },
}
</script>

<style lang="scss" scoped></style>
