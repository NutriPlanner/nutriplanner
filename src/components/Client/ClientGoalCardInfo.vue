<template>
    <div class="np-component np-component--client-goal-card-info">
        <b-card>
            <template #header>
                <h4 class="m-0">
                    CLO.:
                    <b-badge variant="tertiary" class="object-id np-component--client-goal-card-info__badge">
                        {{ goal.id }}
                    </b-badge>
                </h4>
            </template>

            <Overlay :loading="loading">
                <b-card-text>
                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="colClass"
                        >
                            Nombre
                        </b-col>
                        <b-col>: <span class="text-muted">{{ goal.name }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="colClass"
                        >
                            Estado
                        </b-col>
                        <b-col>: <span class="text-muted">{{ goal.status }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="colClass"
                        >
                            F. Inicio
                        </b-col>
                        <b-col>: <span class="text-muted">{{ startDate }}</span></b-col>
                    </b-row>
                </b-card-text>
            </Overlay>
        </b-card>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name  : 'ClientGoalCardInfoComponent',
    props : {
        goal: {
            type     : Object,
            required : false,
            default  : () => ( {} ),
        },

        loading: {
            type     : Boolean,
            required : false,
            default  : false,
        },
    },

    computed: {
        colClass() {
            return {
                'np-component--client-goal-card-info__field': this.$mq !== 'xs',
            }
        },

        startDate() {
            return this.goal.start_date ? moment.utc(this.goal.start_date).local().format('DD-MM-YYYY') : ''
        },
    },
}
</script>

<style lang="scss" scoped>
.np-component--client-goal-card-info {
    &__badge {
        vertical-align: bottom;
    }

    &__field {
        max-width: 100px;
    }
}
</style>
