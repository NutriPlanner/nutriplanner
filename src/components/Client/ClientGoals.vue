<template>
    <div>
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
