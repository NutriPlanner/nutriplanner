<template>
    <div class="np-component np-component--client-card-info">
        <b-card>
            <template #header>
                <h4 class="m-0">
                    CLI.:
                    <b-badge variant="tertiary" class="object-id np-component--client-card-info__badge">
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
                            :class="colClass"
                        >
                            RUT
                        </b-col>
                        <b-col>: <span class="text-muted">{{ client.rut }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="colClass"
                        >
                            Nombre
                        </b-col>
                        <b-col>: <span class="text-muted">{{ fullName }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="colClass"
                        >
                            Correo
                        </b-col>
                        <b-col>: <span class="text-muted">{{ client.email }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="colClass"
                        >
                            Teléfono
                        </b-col>
                        <b-col>: <span class="text-muted">{{ client.phone }}</span></b-col>
                    </b-row>

                    <b-row>
                        <b-col
                            cols="12"
                            sm="3"
                            md="2"
                            :class="colClass"
                        >
                            Dirección
                        </b-col>
                        <b-col>: <span class="text-muted">{{ client.address }}</span></b-col>
                    </b-row>
                </b-card-text>
            </Overlay>
        </b-card>
    </div>
</template>

<script>
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
        colClass() {
            return {
                'np-component--client-card-info__field': this.$mq !== 'xs',
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

<style lang="scss" scoped>
.np-component--client-card-info {
    &__badge {
        vertical-align: bottom;
    }

    &__field {
        max-width: 100px;
    }
}
</style>
