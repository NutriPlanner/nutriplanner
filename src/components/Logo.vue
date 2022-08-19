<template>
    <div :class="classNames.logo">
        <img src="@/assets/images/icon.svg" :class="classNames.icon">
        <h4 :class="classNames.appName">
            NutriPlanner
        </h4>
    </div>
</template>

<script>
import cx from 'classnames'

export default {
    name: 'LogoComponent',

    computed: {
        classNames() {
            return {
                logo    : this.$style.logo,
                icon    : cx(this.$style.icon, 'mb-2'),
                appName : 'text-muted',
            }
        },
    },
}
</script>

<style lang="scss" module>

.logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.icon {
    max-width: 100px;
    border-radius: 25px;
}

</style>
