<template>
    <div class="np-page np-page--tracking-post">
        <b-card title="Registrar seguimiento">
            <b-card-text>
                <TrackingForm ref="form" :form-initial-data="formInitialData" @submit="onSubmit" />
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import { FULLFILLED } from '@/utils/responseStatus'

const formInitialData = {
    status      : 'PENDING',
    subject     : '',
    measurement : {
        chest     : '',
        waist     : '',
        arm       : '',
        stomach   : '',
        thigh     : '',
        bottom    : '',
        body_mass : '',
    },
    note: '',
}

export default {
    name: 'TrackingPostPage',
    data () {
        return {
            formInitialData,
        }
    },
    beforeCreate () {
        if (!this.$store.state.trackings.selectedClientId)
            this.$router.push( { name: 'home-tracking' } )
    },
    methods: {
        async onSubmit (data) {
            const { status } = await this.$store.dispatch('trackings/create', data)

            if (status === FULLFILLED)
                this.$refs.form.reset()
        },
    },
}
</script>

<style lang="scss" scoped></style>
