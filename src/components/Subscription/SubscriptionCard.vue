<template>
    <div :class="classNames.card">
        <div :class="$style.cardColumn">
            <div :class="$style.cardSummary">
                <h5>{{ planName }}</h5>

                <div :class="$style.priceWrapper">
                    <h2 :class="$style.planPrice">
                        {{ planPrice }}
                    </h2>
                    <div>
                        <span>100 clientes /</span>
                        <span>mes</span>
                    </div>
                </div>
            
                <h6 v-if="!showMonthlyPrice" class="mt-4">
                    Total {{ planYearlyPrice }} <br>
                    <span :class="$style.legendBilledAnnually">Cobrado anualmente</span>
                </h6>

                <div :class="$style.separator" />

                <b-button class="mt-4" variant="outline-primary" :disabled="disabled">
                    Cambiar plan
                </b-button>
            </div>

            <b-link class="text-center my-4" @click="expandedDetails = !expandedDetails">
                {{ expandedDetails ? 'Ocultar' : 'Mostrar' }} características
                <i v-if="expandedDetails" class="ri-arrow-up-s-line" />
                <i v-else class="ri-arrow-down-s-line" />
            </b-link>

            <div v-show="expandedDetails" :class="$style.features">
                <div v-for="(planFeature, index) of planFeatures" :key="index">
                    {{ planFeature }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cx from 'classnames'
import { licensee } from '@/config/licensees'
import { subscriptionName, subscriptionFeatures, subscriptionPrice } from '@/config/subscriptions'

export default {
    name: 'SubscriptionCardComponent',

    props: {
        plan: {
            type     : String,
            required : true,
        },

        showMonthlyPrice: {
            type    : Boolean,
            default : true,
        },

        disabled: {
            type    : Boolean,
            default : false,
        },
    },

    data() {
        return {
            expandedDetails: false,
        }
    },

    computed: {
        classNames() {
            return {
                card: cx(this.$style.card, {
                    [this.$style.planBasic] : this.plan === licensee.BASIC,
                    [this.$style.planPro]   : this.plan === licensee.PRO,
                    [this.$style.planAdv]   : this.plan === licensee.ADV,
                } ),
            }
        },

        planName() {
            return subscriptionName[this.plan]
        },

        planPrice() {
            if (!this.showMonthlyPrice)
                return subscriptionPrice[this.plan].yearly.propMonthlyPrice

            return subscriptionPrice[this.plan].monthly
        },

        planYearlyPrice() {
            return subscriptionPrice[this.plan].yearly.price
        },

        planFeatures() {
            return subscriptionFeatures[this.plan]
        },
    },
}
</script>

<style lang="scss" scoped module>
@import '@/assets/styles/globals/colors';

.card {
    display: inline-block;
    background-color: $n100;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 $n300;
    padding: 16px;
    min-width: 250px;
    flex-grow: 1;
}

.planBasic {
    border-top: 4px solid $p600;

    [class^="planPrice"] {
        color: $p800;
    }
}

.planPro {
    border-top: 4px solid rgba(255,175,16,1);

    [class^="planPrice"] {
        color: rgba(255,175,16,1);
    }
}

.planAdv {
    border-top: 4px solid rgba(253,225,255,1);

    [class^="planPrice"] {
        color: rgba(253,225,255,1);
    }
}

.cardColumn {
    display: flex;
    flex-direction: column;
}

.cardSummary {
    min-height: 220px;
    display: flex;
    flex-direction: column;
}

.priceWrapper {
    margin-top: 16px;
    display: flex;
    align-items: flex-end;

    div {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        margin-left: 4px;

        span {
            font-size: 0.9rem;
            font-weight: 300;
            line-height: 14px;
        }
    }
}

.planPrice {
    margin: 0;
}

.yearlyTotalLegend {
    display: inline-block;
    width: fit-content;
}

.legendBilledAnnually {
    font-size: 0.9rem;
    font-weight: 300;
    line-height: 14px;
}

.separator {
    flex-grow: 1;
}

.features {
    display: flex;
    flex-direction: column;
    color: $n700;
    
    div {
        margin-bottom: 8px;
    }
}
</style>
