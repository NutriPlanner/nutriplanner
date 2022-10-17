<template>
    <div>
        <b-card>
            <template #header>
                <CardHeader>Agregar cliente</CardHeader>
            </template>

            <ClientForm @submit="create" />
        </b-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'ClientsPostPage',

    beforeMount() {
        this.resetData()
    },

    methods: {
        ...mapActions('clientForm', {
            resetData : 'resetData',
            create    : 'create',
        } ),
    },
}
</script>
