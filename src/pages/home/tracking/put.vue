<template>
    <div class="np-page np-page--tracking-put">
        <b-card title="Editar seguimiento">
            <b-card-text>
                <TrackingForm :form-initial-data="formInitialData" @submit="onSubmit" />
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'TrackingPutPage',
    data () {
        return {
            formInitialData: {},
        }
    },
    beforeCreate () {
        if (!this.$store.state.trackings.selectedClientId)
            this.$router.push( { name: 'home-tracking' } )
    },
    beforeMount () {
        this.formInitialData = this.$store.state.trackings.update

        if (_.isEmpty(this.formInitialData) || !this.formInitialData.id)
            this.$router.push( { name: 'home-tracking' } )
    },
    methods: {
        async onSubmit (data) {
            await this.$store.dispatch('trackings/update', data)
        },
    },
}
</script>

<style lang="scss" scoped></style>
