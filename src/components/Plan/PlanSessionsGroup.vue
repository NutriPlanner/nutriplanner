<template>
    <div class="np-component np-component--plan-sessions-group">
        <PlanSessionInput
            v-for="(session, index) in sessions"
            :ref="`si-${index}`"
            :key="index"
            :subject.sync="session.subject"
            :start.sync="session.start"
            :disabled="disabled"
            :allow-delete="allowDelete"
            @delete-session="onDeleteSession(index)"
        />
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name  : 'PlanSessionsGroupComponent',
    props : {
        sessions: {
            type     : Array,
            required : true,
        },
        disabled: {
            type     : Boolean,
            required : false,
            default  : false,
        },
        allowDelete: {
            type     : Boolean,
            required : false,
            default  : false,
        },
    },
    methods: {
        async validate() {
            for (let i = 0; i < this.sessions.length; i++) {
                const valid = await this.$refs[`si-${i}`][0].validate()
                if (!valid)
                    return false
            }
        },

        onDeleteSession(index) {
            if (!this.disabled)
                this.$emit('delete-session', index)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
