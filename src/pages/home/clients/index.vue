<template>
    <div class="np-page np-page--clients">
        <b-card>
            <template #header>
                <CardHeader>Clientes</CardHeader>
            </template>

            <Maintainer
                ref="maintainer"
                :fields="fields"
                :items="items"
                :total-rows="totalRows"
                :page="page"
                :loading="loading"
                @new-registry="redirectToPost"
                @edit-registry="redirectToPut"
                @delete-registry="deleteRegistry"
                @filters-changed="fetchAction"
            />
        </b-card>
    </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import { mapGetters, mapActions } from 'vuex'
import { ResponseStatus } from '@/utils'

export default {
    name: 'ClientsPage',

    async fetch() {
        await this.fetchAction()
    },

    computed: {
        ...mapMultiRowFields('clients', {
            items: 'data.clients',
        } ),

        ...mapFields('clients', {
            totalRows : 'data.totalRows',
            page      : 'data.page',
            loading   : 'loading',
        } ),

        ...mapGetters('clients', {
            fields: 'tableFields',
        } ),
    },

    methods: {
        ...mapActions('clients', {
            fetchAction          : 'fetch',
            deleteRegistryAction : 'deleteRegistry',
            redirectToPost       : 'redirectToPost',
            redirectToPut        : 'redirectToPut',
        } ),

        async deleteRegistry (id) {
            const response = await this.deleteRegistryAction(id)

            if (response.status = ResponseStatus.FULLFILLED)
                this.$refs.maintainer.reFetch()
        },
    },
}
</script>

<style lang="scss" scoped></style>
