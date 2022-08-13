<template>
    <div class="np-page np-page--plan">
        <b-card>
            <template #header>
                <CardHeader>Planes</CardHeader>
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
    name: 'PlansPage',

    async fetch() {
        await this.fetchAction()
    },

    computed: {
        ...mapMultiRowFields('plans', {
            items: 'data.plans',
        } ),

        ...mapFields('plans', {
            totalRows : 'data.totalRows',
            page      : 'data.page',
            loading   : 'loading',
        } ),

        ...mapGetters('plans', {
            fields: 'tableFields',
        } ),
    },

    methods: {
        ...mapActions('plans', {
            fetchAction          : 'fetch',
            deleteRegistryAction : 'deleteRegistry',
            redirectToPost       : 'redirectToPost',
            redirectToPut        : 'redirectToPut',
        } ),

        async deleteRegistry (id) {
            const confirm = await this.$bvModal.msgBoxConfirm(
                'Si elimina este plan, los seguimientos asociados seguirán existiendo. ¿Desea continuar?',
                {
                    title         : 'Eliminar plan',
                    size          : 'md',
                    okVariant     : 'danger',
                    okTitle       : 'Eliminar',
                    cancelTitle   : 'Cancelar',
                    cancelVariant : 'outline-primary',
                },
            )

            if (confirm) {
                const response = await this.deleteRegistryAction(id)

                if (response.status = ResponseStatus.FULLFILLED)
                    this.$refs.maintainer.reFetch()
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
