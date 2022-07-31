<template>
    <div class="np-component np-component--client-form">
        <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
                <validation-provider
                    v-slot="validationContext"
                    name="uuid"
                    :rules="{ required: false }"
                >
                    <b-form-group
                        id="input-group-uuid"
                        label="HerbaID"
                        label-for="input-uuid"
                    >
                        <b-form-input
                            id="input-uuid"
                            v-model="form.herba_id"
                            aria-describedby="input-uuid-feedback"
                        />

                        <b-form-invalid-feedback id="input-uuid-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>

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

                <validation-provider
                    v-slot="validationContext"
                    name="apellido"
                    :rules="{ required: true }"
                >
                    <b-form-group
                        id="input-group-last_name"
                        label="Apellido(s)"
                        label-for="input-last_name"
                    >
                        <b-form-input
                            id="input-last_name"
                            v-model="form.last_name"
                            v-input-upper
                            aria-describedby="input-last_name-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-last_name-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>

                <validation-provider
                    v-slot="validationContext"
                    name="rut"
                    :rules="{ required: true, rut: true }"
                >
                    <b-form-group id="input-group-rut" label="RUT" label-for="input-rut">
                        <b-form-input
                            id="input-rut"
                            v-model="form.rut"
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

                <validation-provider
                    v-slot="validationContext"
                    name="fecha nacimiento"
                    :rules="{ required: true }"
                >
                    <b-form-group
                        id="input-group-birthday"
                        label="Fecha Nacimiento"
                        label-for="input-birthday"
                    >
                        <b-form-datepicker
                            id="input-birthday"
                            v-model="form.birthday"
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

                <validation-provider
                    v-slot="validationContext"
                    name="dirección"
                    :rules="{ required: true }"
                >
                    <b-form-group
                        id="input-group-address"
                        label="Dirección física"
                        label-for="input-address"
                    >
                        <b-form-input
                            id="input-address"
                            v-model="form.address"
                            v-input-upper
                            aria-describedby="input-address-feedback"
                            :state="__getValidationState(validationContext)"
                        />

                        <b-form-invalid-feedback id="input-address-feedback">
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>

                <validation-provider
                    v-slot="validationContext"
                    name="teléfono"
                    :rules="{ required: true, min: 9, max: 9 }"
                >
                    <b-form-group
                        id="input-group-phone"
                        label="Teléfono"
                        label-for="input-phone"
                    >
                        <b-form-input
                            id="input-phone"
                            v-model="form.phone"
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

                <validation-provider
                    v-slot="validationContext"
                    name="correo"
                    rules="required|email"
                >
                    <b-form-group
                        id="input-group-email"
                        label="Correo electrónico"
                        label-for="input-email"
                    >
                        <b-form-input
                            id="input-email"
                            v-model="form.email"
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
import _ from 'lodash'

export default {
    name  : 'ClientFormComponent',
    props : {
        formInitialData: {
            type     : Object,
            required : true,
        },
    },
    data () {
        return {
            form: _.cloneDeep(this.formInitialData),
        }
    },
    computed: {
        loading () {
            return this.$store.state.clients.loading
        },
    },
    mounted () {
        this.reset()
    },
    methods: {
        onSubmit () {
            this.$emit('submit', _.cloneDeep(this.form) )
        },
        reset (newData) {
            this.form = _.cloneDeep(newData || this.formInitialData)
            setTimeout( () => {
                this.$refs.formObserver.validate()
            }, 100)
        },
    },
}
</script>

<style lang="scss" scoped></style>
