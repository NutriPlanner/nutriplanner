<template>
    <div class="np-component np-component--client-active-goal">
        <b-card>

            <!--  CARD HEADER -->

            <template #header>
                <b-row align-v="center">
                    <b-col cols="8" sm="10">
                        <h6 class="m-0">
                            OBJETIVO: {{ name }}
                        </h6>
                    </b-col>

                    <b-col cols="4" sm="2">
                        <b-progress
                            :value="progress.completed"
                            :max="progress.total"
                            variant="success"
                            animated
                        />
                    </b-col>
                </b-row>
            </template>


            <!--  CARD BODY -->

            <validation-observer ref="formObserver" v-slot="{ handleSubmit }">
                <b-form @submit.stop.prevent="handleSubmit(save)">

                    <!-- NAME -->
                    <validation-provider v-slot="validationContext" name="name" :rules="{ required: true }">
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
                                aria-describedby="input-name-feedback"
                            />

                            <b-form-invalid-feedback id="input-name-feedback">
                                {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>


                    <!-- STATUS -->
                    <validation-provider v-slot="validationContext" name="estado" :rules="{ required: true }">
                        <b-form-group
                            id="input-group-status"
                            label="Estado"
                            label-for="input-status"
                        >
                            <b-skeleton v-if="loading" type="input" />
                            <b-form-select
                                v-else
                                id="input-status"
                                v-model="status"
                                :options="statusOptions"
                                :state="__getValidationState(validationContext)"
                            />

                            <b-form-invalid-feedback id="input-status-feedback">
                                {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>


                    <!-- START_DATE -->
                    <validation-provider v-slot="validationContext" name="fecha inicio" :rules="{ required: true }">
                        <b-form-group
                            id="input-group-start_date"
                            label="Fecha inicio"
                            label-for="input-start_date"
                        >
                            <b-skeleton v-if="loading" type="input" />
                            <b-form-datepicker
                                v-else
                                id="input-start_date"
                                v-model="start_date"
                                aria-describedby="input-start_date-feedback"
                                reset-button
                                label-reset-button="Limpiar"
                                label-no-date-selected="Fecha no seleccionada"
                                :disabled="!isNew"
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
                    

                    <!-- TASKS LIST -->


                    <!-- NEW TASK BUTTON -->
                    <b-row align-v="baseline" class="mt-5 mb-3">
                        <b-col>
                            <p class="text-uppercase m-0">
                                LISTADO DE TAREAS
                            </p>
                        </b-col>

                        <b-col cols="auto">
                            <b-button
                                size="sm"
                                variant="outline-primary"
                                :disabled="loading"
                                @click="addNewTask"
                            >
                                Agregar tarea
                            </b-button>
                        </b-col>
                    </b-row>
                    <hr>
                    

                    <!-- TASKS -->
                    <ClientActiveGoalTasks
                        ref="clientGoalTasks"
                        :tasks="tasks"
                        :disabled="loading"
                        @delete="deleteTask"
                    />


                    <!-- PLAN SETUP -->


                    <!-- PLAN TITLE -->
                    <p class="text-uppercase mt-5 mb-3">
                        CONFIGURACIÓN DE PLAN
                    </p>
                    <hr>


                    <!-- PLAN -->
                    <template v-if="isNew">
                        <validation-provider v-slot="validationContext" name="plan" :rules="{ required: false }">
                            <b-form-group
                                id="input-group-plan"
                                label="Plan"
                                label-for="input-plan"
                            >
                                <b-skeleton v-if="loading" type="input" />
                                <DataSelect
                                    v-else
                                    id="input-plan"
                                    v-model="plan"
                                    :select-options="planOptions"
                                    :loading="loadingPlans"
                                    aria-describedby="input-status-feedback"
                                    :state="__getValidationState(validationContext)"
                                    @update:search="fetchPlanOptions"
                                >
                                    <template #first>
                                        <option :value="null">
                                            -- sin selección --
                                        </option>
                                    </template>
                                </DataSelect>

                                <b-form-invalid-feedback id="input-status-feedback">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                    </template>

                    <template v-else>
                        <b-form-group
                            id="input-group-plan"
                            label="Plan"
                            label-for="input-plan"
                        >
                            <b-skeleton v-if="loading" type="input" />
                            <b-form-input
                                v-else
                                id="input-plan"
                                :value="plan"
                                disabled
                            />
                        </b-form-group>
                    </template>
                    

                    <!-- EXTEND PLAN BUTTON -->
                    <b-button
                        block
                        variant="outline-primary"
                        :disabled="loading"
                        class="mb-3"
                        @click="addNewExtraSession"
                    >
                        Extender Plan
                    </b-button>


                    <!-- NEW PLAN SESSIONS -->
                    <PlanSessionsGroup
                        ref="extraSessionsGroup"
                        :sessions="extra_sessions"
                        :disabled="loading"
                        @delete-session="deleteExtraSession"
                    />


                    <!-- SAVE BUTTON -->
                    <Overlay :loading="loading">
                        <b-button block type="submit" variant="primary">
                            Guardar Cambios
                        </b-button>
                    </Overlay>


                    <!-- CLOSE GOAL BUTTON -->
                    <Overlay :loading="loading">
                        <b-button block variant="outline-primary" @click="closeGoal">
                            Cerrar Objetivo
                        </b-button>
                    </Overlay>
                </b-form>
            </validation-observer>
        </b-card>
    </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import { mapActions, mapGetters } from 'vuex'
import { ResponseStatus } from '@/utils'

export default {
    name: 'ClientActiveGoalFormComponent',
    
    async fetch() {
        this.resetData()
        await this.fetchAction( { clientId: this.$route.query.id } )

        this.$refs.formObserver.validate()
        this.$refs.clientGoalTasks.validate()
    },

    computed: {
        ...mapFields('clientGoalForm', {
            name         : 'data.name',
            status       : 'data.status',
            start_date   : 'data.start_date',
            plan         : 'data.plan',
            isNew        : 'isNew',
            loading      : 'loading',
            loadingPlans : 'loadingPlans',
        } ),

        ...mapMultiRowFields('clientGoalForm', {
            tasks          : 'data.tasks',
            extra_sessions : 'data.extra_sessions',
        } ),

        ...mapGetters('clientGoalForm', {
            statusOptions : 'statusOptions',
            planOptions   : 'planOptions',
            progress      : 'progress',
        } ),

        existExtraSessions() {
            return this.extra_sessions ? this.extra_sessions.length > 0 : false
        },
    },

    watch: {
        tasks() {
            if (this.$refs.clientGoalTasks.validate) {
                setTimeout( () => {
                    this.$refs.clientGoalTasks.validate()
                }, 100)
            }
        },

        extra_sessions() {
            if (this.$refs.extraSessionsGroup.validate) {
                setTimeout( () => {
                    this.$refs.extraSessionsGroup.validate()
                }, 100)
            }
        },
    },

    methods: {
        ...mapActions('clientGoalForm', {
            fetchAction        : 'fetch',
            save               : 'save',
            fetchPlanOptions   : 'fetchPlanOptions',
            addNewTask         : 'addNewTask',
            deleteTask         : 'deleteTask',
            addNewExtraSession : 'addNewExtraSession',
            deleteExtraSession : 'deleteExtraSession',
            resetData          : 'resetData',
            close              : 'close',
        } ),

        async closeGoal() {
            const confirm = await this.$bvModal.msgBoxConfirm(
                '¿Está seguro de cerrar el objetivo? Esta acción no se puede revertir. Una vez cerrado el objetivo, los seguimientos pendientes desde ahora pasarán a estado CERRADO, esto no impide su posterior modificación.',
                {
                    title         : 'Cerrar objetivo',
                    size          : 'md',
                    okTitle       : 'Cerrar',
                    okVariant     : 'danger',
                    cancelTitle   : 'Cancelar',
                    cancelVariant : 'outline-primary',
                },
            )

            if (confirm) {
                const result = await this.close()

                if (result.status === ResponseStatus.FULLFILLED) {
                    setTimeout( () => {
                        this.$refs.formObserver.validate()
                    }, 100)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
