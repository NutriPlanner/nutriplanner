<template>
    <div>
        <b-card>
            <template #header>
                <CardHeader>Crear plan</CardHeader>
            </template>

            <PlanForm @submit="create" />
        </b-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'PlansPostPage',

    beforeMount() {
        this.resetData()
    },

    methods: {
        ...mapActions('planForm', {
            resetData : 'resetData',
            create    : 'create',
        } ),
    },
}
</script>
