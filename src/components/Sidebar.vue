<template>
    <div class="np-component np-component--sidebar">
        <b-sidebar
            :id="target"
            backdrop
            shadow
            no-header
        >
            <div class="px-3 py-4">
                <b-nav vertical pills>
                    <b-nav-item
                        v-for="({ text, licensee }, name) in routes"
                        :key="name"
                        :to="{ name }"
                        exact
                        exact-active-class="active"
                        :active="activeRoute === name"
                        :disabled="!$loyalty.validate(licensee)"
                    >
                        {{ text }} <Licensee v-if="!userHasRequiredLicensee(licensee)" :type="licensee" />
                    </b-nav-item>
                </b-nav>
            </div>
        </b-sidebar>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { breadcrumbs } from '@/config/routes'

export default {
    name: 'SidebarComponent',
    
    props: {
        target: {
            type    : String,
            default : 'sidebar',
        },
    },

    computed: {
        ...mapFields('breadcrumb', {
            activeRoute: 'active',
        } ),

        routes () {
            return Object.entries(breadcrumbs)
                .filter( ( [ , { show }] ) => show !== false)
                .reduce( (acc, route) => {
                    acc[route[0]] = route[1]

                    return acc
                }, {} )
        },
    },

    methods: {
        userHasRequiredLicensee(licensee) {
            return this.$loyalty.validate(licensee)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/globals/mainColors';
@import '@/assets/styles/globals/colors';

.nav-link {
    margin-bottom: 5px;

    &.disabled {
        background-color: $disabled-bkg;
    }

    &:not(.active):not(.disabled) {
        border: solid 1px $primary;

        &:hover {
            background-color: rgba($primary, 0.1);
        }
    }
}

</style>
