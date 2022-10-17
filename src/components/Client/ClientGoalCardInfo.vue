<template>
    <div>
        <b-card>
            <template #header>
                <h4 class="m-0">
                    CLO.:
                    <b-badge variant="tertiary" :class="classNames.badge">
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
                            :class="classNames.field"
                        >
                            Nombre
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ goal.name }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="classNames.field"
                        >
                            Estado
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ goal.status }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="classNames.field"
                        >
                            F. Inicio
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ startDate }}</span></b-col>
                    </b-row>
                </b-card-text>
            </Overlay>
        </b-card>
    </div>
</template>

<script>
import moment from 'moment'
import cx from 'classnames'

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
        classNames() {
            return {
                badge : cx(this.$style.badge, 'object-id'),
                field : cx( {
                    [this.$style.field]: this.$mq !== 'xs',
                } ),
                fieldValue: cx('text-muted'),
            }
        },

        startDate() {
            return this.goal.start_date ? moment.utc(this.goal.start_date).local().format('DD-MM-YYYY') : ''
        },
    },
}
</script>

<style lang="scss" module>
.badge {
    vertical-align: bottom;
}

.__field {
    max-width: 100px;
}
</style>
