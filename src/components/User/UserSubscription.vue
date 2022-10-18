<template>
    <div>
        <SubscriptionActive />
        
        <section :class="classNames.plansSection">
            <h4>MEJORA TU PLAN</h4>
            <hr>

            <b-row>
                <b-col>
                    <b-form-checkbox v-model="showMonthlyPrice" switch size="lg">
                        Precio {{ showMonthlyPrice ? 'Mensual' : 'Anual' }}
                    </b-form-checkbox>
                </b-col>
            </b-row>

            <div :class="classNames.plansRow">
                <div :class="classNames.planWrapper">
                    <SubscriptionCard :disabled="userLicensee === licensee.BASIC" :plan="licensee.BASIC" :show-monthly-price="showMonthlyPrice" />
                </div>

                <div :class="classNames.planWrapper">
                    <SubscriptionCard :disabled="userLicensee === licensee.PRO" :plan="licensee.PRO" :show-monthly-price="showMonthlyPrice" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import cx from 'classnames'
import { licensee } from '@/config/licensees'

export default {
    name: 'UserSubscriptionComponent',

    data() {
        return {
            licensee,
            showMonthlyPrice: true,

            planWrapperBreakpoint: [ 'xs', 'sm' ],
        }
    },

    computed: {
        classNames() {
            return {
                plansSection : cx('mt-5', this.$style.plansSection),
                plansRow     : cx(this.$style.plansRow),
                planWrapper  : cx( {
                    [this.$style.planMobileWrapper]  : this.planWrapperBreakpoint.includes(this.$mq),
                    [this.$style.planDesktopWrapper] : !this.planWrapperBreakpoint.includes(this.$mq),
                } ),
            }
        },

        userLicensee() {
            return this.$store.state.auth.user.licensee || licensee.BASIC
        },
    },
}
</script>

<style lang="scss" module>
.plansSection {
    overflow: auto;
}

.plansRow {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding: 16px 15px;
}

.planMobileWrapper {
    display: flex;
    flex-grow: 1;
}

.planDesktopWrapper {
    max-width: 250px;
    flex-grow: 0;
}
</style>
