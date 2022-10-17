<template>
    <div :class="classNames.layout">
        <NavigationBar sidebar-toggle-target="sidebar" />

        <Sidebar toggle="sidebar" />

        <b-container fluid>
            <Breadcrumb />
        </b-container>

        <b-container fluid :class="classNames.container">
            <Nuxt />
        </b-container>

        <NutriPlannerFooter />
    </div>
</template>

<script>
import cx from 'classnames'

export default {
    name: 'DefaultLayout',

    computed: {
        classNames() {
            return {
                layout    : this.$style.layout,
                container : cx(this.$style.container, 'py-3'),
            }
        },
    },
}
</script>

<style lang="scss" module>
.layout {
    display: flex;
    flex-direction: column;
}

.container {
    flex-grow: 1;
}

</style>
