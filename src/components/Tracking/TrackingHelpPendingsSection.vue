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
                <span class="no-transform">Pendientes está deshabilitado</span>.
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
                        Licencia requerida: <Licensee :type="pendingsRequiredLicensee" />
                    </p>

                    <p class="m-0">
                        Para poder habilitar la lista de pendientes, primero debe actualizar
                        su licencia a la requerida. Esta lista de <code>PENDIENTES</code>
                        le ayudará a conocer los seguimientos que posee en estado de <code>PENDING (PENDIENTE)</code>
                        hasta la fecha actual.
                    </p>
                </b-card-text>
            </b-card-body>
        </b-collapse>
    </b-card>
</template>

<script>
import { feature, requiredLicensee } from '@/config/features'

export default {
    name: 'TrackingHelpPendingsSectionComponent',

    data () {
        return {
            collapsed: true,
        }
    },

    computed: {
        pendingsRequiredLicensee() {
            return requiredLicensee(feature.TRACKINGS_PENDINGS)
        },
    },
}
</script>
