<template>
    <div>
        <UserPersonalInfo />
        <UserPasswordInfo :class="classNames.passwordCard" />
    </div>
</template>

<script>
export default {
    name: 'PreferencesPage',

    computed: {
        classNames() {
            return {
                passwordCard: 'mt-5',
            }
        },
    },
}
</script>
