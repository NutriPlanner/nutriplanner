<template>
    <b-container :class="classNames.layout">
        <Logo :class="classNames.logo" />
        <Nuxt :class="classNames.page" />
        
        <NutriPlannerFooter />
        <Copyright />
    </b-container>
</template>

<script>
import cx from 'classnames'

export default {
    name: 'StartLayout',

    computed: {
        classNames() {
            return {
                layout : this.$style.layout,
                logo   : cx('pt-5', 'pb-5'),
                page   : this.$style.page,
            }
        },
    },
}
</script>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page {
    flex: auto;
    width: 100%;
}
</style>
