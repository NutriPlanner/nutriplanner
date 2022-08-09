<template>
    <div class="np-component np-component--client-goals">
        <ClientCardInfo :client="client" class="mb-5" />

        <ClientActiveGoalForm />

        <!-- <ClientGoalList /> -->
    </div>
</template>

<script>
export default {
    name  : 'ClientGoalsComponent',
    props : {
        client: {
            type     : Object,
            required : true,
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
