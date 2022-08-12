<template>
    <b-card no-body class="mb-0 border-0">
        <b-card-header class="p-0" role="tab">
            <b-button
                class="text-left"
                variant="link"
                block
                @click="collapsed = !collapsed"
            >
                <i class="ri-question-line" /> Ayuda:
                <span class="no-transform">Qué son los objetivos?</span>
            </b-button>
        </b-card-header>

        <b-collapse
            :visible="!collapsed"
            :accordion="`help-${_uid}`"
            role="tabpanel"
        >
            <b-card-body>
                <b-card-text>
                    <p>
                        Los objetivos son las metas que el cliente desea alcanzar. Cuando se registra un objetivo,
                        el sistema le pedirá que ingrese un plan de acción para lograrlo. El plan es una plantilla
                        que le permitirá generar rápidamente los seguimientos de su cliente (para crear un plan, diríjase a <b-link href="/home/plan" target="_blank">
                            Plan4U
                        </b-link>).
                    </p>

                    <p class="text-uppercase">
                        NOTAS Y OTRAS FUNCIONES
                    </p>
                    <hr>

                    <ol>
                        <li>Si usted siente que el progreso no es el esperado y para lograr el objetivo es necesario ampliar las sesiones de seguimiento, puede hacerlo dando click sobre <code>EXTENDER PLAN</code>.</li>
                        <li>El selector de <code>COMPLETADO | INCOMPLETO</code> sirve para indicar si el objetivo fue logrado o no. Además, le podría permitir llevar una estadística sobre la efectividad de los planes aplicados.</li>
                        <li>Los seguimientos definidos en el plan seleccionado, serán aplicados según la fecha de inicio especificada en el objetivo.</li>
                        <li>Solo se puede tener activo un objetivo a la vez. Si este es cerrado, no hay posibilidad de volver a abrirlo.</li>
                    </ol>
                </b-card-text>
            </b-card-body>
        </b-collapse>
    </b-card>
</template>

<script>
export default {
    name: 'ClientHelpSectionComponent',
    data () {
        return {
            collapsed: true,
        }
    },
}
</script>

<style lang="scss" scoped></style>
