<template>
    <div class="np-component np-component--client-form">

        <!-- FORM -->
        <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">


                <!-- HERBA_ID -->
                <validation-provider v-slot="validationContext" name="herbal_id" :rules="{ required: false }">
                    <b-form-group
                        id="input-group-uuid"
                        label="HerbaID"
                        label-for="input-uuid"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-uuid"
                            v-model="herba_id"
                            aria-describedby="input-uuid-feedback"
                        />

                        <b-form-invalid-feedback id="input-uuid-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- NAME -->
                <validation-provider v-slot="validationContext" name="nombre" :rules="{ required: true }">
                    <b-form-group
                        id="input-group-name"
                        label="Nombre"
                        label-for="input-name"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-name"
                            v-model="name"
                            v-input-upper
                            aria-describedby="input-name-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-name-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- LAST_NAME -->
                <validation-provider v-slot="validationContext" name="apellido" :rules="{ required: true }">
                    <b-form-group
                        id="input-group-last_name"
                        label="Apellido(s)"
                        label-for="input-last_name"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-last_name"
                            v-model="last_name"
                            v-input-upper
                            aria-describedby="input-last_name-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-last_name-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- RUT -->
                <validation-provider v-slot="validationContext" name="rut" :rules="{ required: true, rut: true }">
                    <b-form-group id="input-group-rut" label="RUT" label-for="input-rut">
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-rut"
                            v-model="rut"
                            v-input-upper
                            v-input-rut
                            aria-describedby="input-rut-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-rut-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- BIRTHDAY -->
                <validation-provider v-slot="validationContext" name="fecha nacimiento" :rules="{ required: true }">
                    <b-form-group
                        id="input-group-birthday"
                        label="Fecha Nacimiento"
                        label-for="input-birthday"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-datepicker
                            v-else
                            id="input-birthday"
                            v-model="birthday"
                            aria-describedby="input-birthday-feedback"
                            show-decade-nav
                            reset-button
                            label-reset-button="Limpiar"
                            label-no-date-selected="Fecha no seleccionada"
                            :date-format-options="{
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            }"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-birthday-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- ADDRESS -->
                <validation-provider v-slot="validationContext" name="dirección" :rules="{ required: true }">
                    <b-form-group
                        id="input-group-address"
                        label="Dirección física"
                        label-for="input-address"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-address"
                            v-model="address"
                            v-input-upper
                            aria-describedby="input-address-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-address-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- PHONE -->
                <validation-provider v-slot="validationContext" name="teléfono" :rules="{ required: true, min: 9, max: 9 }">
                    <b-form-group
                        id="input-group-phone"
                        label="Teléfono"
                        label-for="input-phone"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-phone"
                            v-model="phone"
                            v-input-upper
                            v-input-max-length="9"
                            aria-describedby="input-phone-feedback"
                            type="number"
                            no-wheel
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-phone-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- EMAIL -->
                <validation-provider v-slot="validationContext" name="correo" rules="required|email">
                    <b-form-group
                        id="input-group-email"
                        label="Correo electrónico"
                        label-for="input-email"
                    >
                        <b-skeleton v-if="loading" type="input" />
                        <b-form-input
                            v-else
                            id="input-email"
                            v-model="email"
                            v-input-upper
                            type="email"
                            aria-describedby="input-email-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-email-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>


                <!-- SUBMIT BUTTON -->
                <Overlay :loading="loading">
                    <b-button block type="submit" variant="primary">
                        Enviar
                    </b-button>
                </Overlay>
            </b-form>
        </validation-observer>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    name: 'ClientFormComponent',

    computed: {
        ...mapFields('clientForm', {
            herba_id  : 'data.herba_id',
            name      : 'data.name',
            last_name : 'data.last_name',
            rut       : 'data.rut',
            birthday  : 'data.birthday',
            address   : 'data.address',
            phone     : 'data.phone',
            email     : 'data.email',
            loading   : 'loading',
        } ),
    },

    watch: {
        loading() {
            if (!this.loading) {
                setTimeout(() => {
                    this.$refs.formObserver.validate()
                }, 100)
            }
        },
    },

    // post case
    mounted() {
        setTimeout(() => {
            this.$refs.formObserver.validate()
        }, 100)
    },

    methods: {
        onSubmit () {
            this.$emit('submit')
        },
    },
}
</script>

<style lang="scss" scoped></style>
