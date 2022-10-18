<template>
    <div>
        <h4>SUSCRIPCIÓN ACTIVA</h4>
        <hr>

        <b-row>
            <b-col
                cols="12"
                sm="3"
                md="2"
                :class="classNames.field"
            >
                Plan
            </b-col>
            <b-col>: <span :class="classNames.fieldValue">{{ userSubscription }}</span></b-col>
        </b-row>

        <b-row>
            <b-col
                cols="12"
                sm="3"
                md="2"
                :class="classNames.field"
            >
                Valido hasta
            </b-col>
            <b-col>: <span :class="classNames.fieldValue">{{ validUntil }}</span></b-col>
        </b-row>
    </div>
</template>

<script>
import cx from 'classnames'
import  { licensee } from '@/config/licensees'
import  { subscriptionName } from '@/config/subscriptions'

export default {
    name: 'SubscriptionActiveComponent',

    computed: {
        classNames() {
            return {
                field: cx( {
                    [this.$style.field]: this.$mq !== 'xs',
                } ),
                fieldValue: cx('text-muted'),
            }
        },

        userSubscription() {
            const userLicensee = this.$store.state.auth.user.licensee || licensee.BASIC

            return subscriptionName[userLicensee]
        },

        validUntil() {
            return new Date()
        },
    },
}
</script>

<style lang="scss" module>
.__field {
    max-width: 100px;
}
</style>
