<template>
    <div :class="classNames.comingSoon">
        <b-badge pill :class="classNames.badge">
            <i class="ri-time-line" /> Próx.
        </b-badge>
    </div>
</template>

<script>
export default {
    name: 'ComingSoonComponent',

    computed: {
        classNames() {
            return {
                comingSoon : this.$style.comingSoon,
                badge      : this.$style.badge,
            }
        },

        licenseeName() {
            return this.type.toUpperCase()
        },
    },
}
</script>

<style lang="scss" module>
@import '@/assets/styles/globals/colors';

$font-color: $n800;

.badge {
    padding: 3px 8px;

    i {
        font-size: 1rem;
        vertical-align: sub;
    }

    background-color: $a600;
    color: $n900;
}

.comingSoon {
    display: inline-block;
}

</style>
