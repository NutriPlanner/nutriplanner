<template>
    <div>
        <b-card>
            <template #header>
                <h4 class="m-0">
                    CLI.:
                    <b-badge variant="tertiary" :class="classNames.badge">
                        {{ client.id }}
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
                            RUT
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ client.rut }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="classNames.field"
                        >
                            Nombre
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ fullName }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="classNames.field"
                        >
                            Correo
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ client.email }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="classNames.field"
                        >
                            Teléfono
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ client.phone }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="classNames.field"
                        >
                            Dirección
                        </b-col>
                        <b-col>: <span :class="classNames.fieldValue">{{ client.address }}</span></b-col>
                    </b-row>
                </b-card-text>
            </Overlay>
        </b-card>
    </div>
</template>

<script>
import cx from 'classnames'

export default {
    name  : 'ClientCardInfoComponent',
    props : {
        client: {
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

        fullName() {
            const name = this.client.name || ''
            const lastName = this.client.last_name || ''

            return `${name} ${lastName}`.trim()
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
