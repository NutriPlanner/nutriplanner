<template>
    <div class="np-component np-component--tracking-maintainer">
        <ClientCardInfo v-if="client" :client="client" class="mb-4" />

        <Maintainer
            ref="maintainer"
            :fields="fields"
            :items="items"
            :total-rows="totalRows"
            :page.sync="page"
            :loading="loading"
            :default-sort-config="{ sortBy: 'date', sortOrder: true }"
            @new-registry="redirectToPost"
            @edit-registry="redirectToPut"
            @delete-registry="deleteRegistry"
            @filters-changed="fetch"
        >
            <template #cell(status)="data">
                <StatusRender
                    :title="data.value"
                    :description="getStatusOption(data.value).text"
                    :variant="getStatusOption(data.value).variant"
                />
            </template>
        </Maintainer>
    </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
import { ResponseStatus } from '@/utils'
import { getStatusOption } from '@/store/configs/trackings.configs'

export default {
    name: 'TrackingMaintainerPerClientComponents',

    props: {
        client: {
            type     : Object,
            required : false,
            default  : () => undefined,
        },
    },

    computed: {
        ...mapMultiRowFields('trackings/perClient', {
            items: 'data.trackings',
        } ),

        ...mapFields('trackings/perClient', {
            totalRows : 'data.totalResults',
            page      : 'data.page',
            loading   : 'loading',
        } ),

        ...mapGetters('trackings/perClient', {
            fields: 'tableFields',
        } ),
    },
    
    methods: {
        ...mapActions('trackings/perClient', {
            fetchAction          : 'fetch',
            deleteRegistryAction : 'deleteRegistry',
            redirectToPostAction : 'redirectToPost',
            redirectToPut        : 'redirectToPut',
        } ),

        fetch(data) {
            const filter = JSON.parse(data.filter)

            this.fetchAction( {
                ...data,
                filter: JSON.stringify( {
                    ...filter,
                    client: this.client.id,
                } ),
            } )
        },

        redirectToPost () {
            this.redirectToPostAction( { clientId: this.client.id } )
        },

        async deleteRegistry (id) {
            const response = await this.deleteRegistryAction(id)

            if (response.status = ResponseStatus.FULLFILLED)
                this.$refs.maintainer.reFetch()
        },

        reFetch() {
            this.$refs.maintainer.reFetch()
        },

        getStatusOption,
    },
}
</script>

<style lang="scss" scoped></style>
