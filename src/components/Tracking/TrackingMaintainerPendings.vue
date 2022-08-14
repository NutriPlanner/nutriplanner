<template>
    <div class="np-component np-component--tracking-maintainer">
        <Maintainer
            ref="maintainer"
            :fields="fields"
            :items="items"
            :total-rows="totalRows"
            :page.sync="page"
            :loading="loading"
            :default-sort-config="{ sortBy: 'date', sortOrder: true }"
            :show-create-button="false"
            @new-registry="redirectToPost"
            @edit-registry="redirectToPut"
            @delete-registry="deleteRegistry"
            @filters-changed="fetchAction"
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
    name: 'TrackingMaintainerPendingsComponents',

    computed: {
        ...mapMultiRowFields('trackings/pendings', {
            items: 'data.trackings',
        } ),

        ...mapFields('trackings/pendings', {
            totalRows : 'data.totalResults',
            page      : 'data.page',
            loading   : 'loading',
        } ),

        ...mapGetters('trackings/pendings', {
            fields: 'tableFields',
        } ),
    },
    
    methods: {
        ...mapActions('trackings/pendings', {
            fetchAction          : 'getPendings',
            deleteRegistryAction : 'deleteRegistry',
            redirectToPostAction : 'redirectToPost',
            redirectToPut        : 'redirectToPut',
        } ),

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
