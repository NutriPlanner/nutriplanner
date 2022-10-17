<template>
    <div>
        <ClientGoalTaskInput
            v-for="(task, index) in tasks"
            :ref="`task-${index}`"
            :key="index"
            :disabled="disabled"
            :completed.sync="task.completed"
            :description.sync="task.description"
            @delete="onDeleteTask(index)"
        />
    </div>
</template>

<script>
export default {
    name  : 'ClientActiveGoalTasksComponent',
    props : {
        tasks: {
            type     : Array,
            required : true,
        },
        disabled: {
            type     : Boolean,
            required : false,
            default  : false,
        },
    },
    methods: {
        async validate() {
            for (let i = 0; i < this.tasks.length; i++) {
                const valid = await this.$refs[`task-${i}`][0].validate()
                if (!valid)
                    return false
            }
        },

        onDeleteTask(index) {
            this.$emit('delete', index)
        },
    },
}
</script>
