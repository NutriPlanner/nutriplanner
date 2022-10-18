<template>
    <div>
        <b-card no-body>
            <b-tabs pills card>
                <b-tab title="Mis Datos" active>
                    <UserPersonalInfo />
                </b-tab>
                <b-tab title="Contraseña">
                    <UserPasswordInfo />
                </b-tab>
                <b-tab title="Suscripción">
                    <UserSubscription />
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'PreferencesPage',
}
</script>

<style lang="scss" module>

</style>
