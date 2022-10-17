<template>
    <b-navbar
        :class="classNames.navbar"
        toggleable="md"
        sticky
    >
        <SidebarToggle :target="sidebarToggleTarget" />

        <b-navbar-brand href="#">
            NutriPlanner
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" :class="classNames.toggle">
            <template #default="{ expanded }">
                <b-button
                    v-if="expanded"
                    size="sm"
                    class="ml-auto"
                    variant="primary"
                >
                    <i class="ri-menu-3-fill" />
                </b-button>
                <b-button
                    v-else
                    size="sm"
                    class="ml-auto"
                    variant="outline-primary"
                >
                    <i class="ri-menu-3-fill" />
                </b-button>
            </template>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown :text="userName" right>
                    <b-dropdown-item to="/home/user/preferences">
                        Preferencias
                    </b-dropdown-item>
                    <b-dropdown-item @click="logout">
                        Cerrar sesión
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: 'NavigationBarComponent',

    props: {
        sidebarToggleTarget: {
            type    : String,
            default : 'sidebar',
        },
    },

    computed: {
        classNames() {
            return {
                navbar : this.$style.navbar,
                toggle : this.$style.toggle,
            }
        },

        userName () {
            return this.$store.state.auth.user.name
        },
    },

    methods: {
        async logout () {
            const confirmed = await this.$bvModal.msgBoxConfirm(
                '¿Está seguro que deseas continuar?',
                {
                    title         : 'Cerrar sesión',
                    okVariant     : 'primary',
                    okTitle       : 'Cerrar sesión',
                    cancelVariant : 'outline-primary',
                    cancelTitle   : 'Cancelar',
                },
            )

            if (confirmed)
                this.$store.dispatch('authorization/logout')
        },
    },
}
</script>

<style lang="scss" module>
@import "@/assets/styles/globals/colors";

.navbar {
    background-color: $n100;
}

.toggle {
    border: none;
    padding: 0;
}
</style>
