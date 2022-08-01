<template>
    <div class="np-component np-component--user-personal-info">
        <b-card title="Datos Personales">

            <template #header>
                <b-row align-h="end">
                    <b-col cols="auto">
                        <b-button
                            variant="primary"
                            :disabled="loading"
                            @click="onEdit"
                        >
                            <i class="ri-edit-line" />
                            Editar
                        </b-button>
                    </b-col>
                </b-row>
            </template>

            <template v-if="!editMode">
                <b-card-text>ID: <ObjectIdBadge :value="userID" /></b-card-text>
                <b-card-text>Nombre: {{ userName }}</b-card-text>
                <b-card-text>Correo electrónico: {{ userEmail }}</b-card-text>
            </template>

            <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                    <template v-if="editMode">
                        <validation-provider
                            v-slot="validationContext"
                            name="nombre"
                            :rules="{ required: true }"
                        >
                            <b-form-group
                                id="input-group-name"
                                label="Nombre"
                                label-for="input-name"
                            >
                                <b-form-input
                                    id="input-name"
                                    v-model="form.name"
                                    v-input-upper
                                    aria-describedby="input-name-feedback"
                                    :state="__getValidationState(validationContext)"
                                />

                                <b-form-invalid-feedback id="input-name-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>

                        <Overlay :loading="loading">
                            <b-button block type="submit" variant="primary">
                                Guardar
                            </b-button>
                        </Overlay>

                        <b-button
                            block variant="outline-danger" :disabled="loading"
                            @click="editMode = false"
                        >
                            Descartar cambios
                        </b-button>
                    </template>
                </b-form>
            </validation-observer>
        </b-card>
    </div>
</template>

<script>
import _ from 'lodash'
import { FULLFILLED } from '@/utils/responseStatus'

export default {
    name: 'UserPersonalInfoComponent',
    data() {
        return {
            editMode : false,
            form     : {
                name: '',
            },
            internalLoading: false,
        }
    },
    computed: {
        userID() {
            return this.$store.state.auth.user.id || ''
        },

        userName() {
            return this.$store.state.auth.user.name || ''
        },

        userEmail() {
            return this.$store.state.auth.user.email || ''
        },

        loading() {
            return this.$store.state.user.loading && this.internalLoading
        },
    },
    methods: {
        onEdit() {
            this.form = {
                name: this.userName.toUpperCase(),
            }

            this.editMode = true

            setTimeout( () => {
                this.$refs.formObserver.validate()
            }, 100)
        },

        async onSubmit() {
            this.internalLoading = true
            const { status } = await this.$store.dispatch('user/update', _.cloneDeep(this.form) )
            
            if (status === FULLFILLED) {
                await this.$auth.fetchUser()

                this.internalLoading = true
                this.editMode = false
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
