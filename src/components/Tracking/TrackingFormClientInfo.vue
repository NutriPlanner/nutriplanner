<template>
    <div class="np-component np-component--tracking-form-client-info">
        <b-card>
            <template #header>
                <TrackingMaintainerClientReference />
            </template>

            <b-card-text>
                <p class="m-0">
                    Nombre: <span class="text-muted">{{ fullName }}</span>
                </p>
                <p class="m-0">
                    Rut: <span class="text-muted">{{ rut }}</span>
                </p>
                <p class="m-0">
                    Correo electrónico: <span class="text-muted">{{ email }}</span>
                </p>
                <p class="m-0">
                    Teléfono: <span class="text-muted">{{ phone }}</span>
                </p>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    name     : 'TrackingFormClientInfoComponent',
    computed : {
        fullName () {
            return this.$store.state.trackings.selectedClientFullName
        },
        rut () {
            return this.$store.state.trackings.selectedClientRut
        },
        email () {
            return this.$store.state.trackings.selectedClientEmail
        },
        phone () {
            return this.$store.state.trackings.selectedClientPhone
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
