<template>
    <div>
        <b-sidebar
            :id="target"
            backdrop
            shadow
            no-header
        >
            <div class="px-3 py-4">
                <b-nav vertical pills>
                    <b-nav-item
                        v-for="({ text, licensee, commingSoon }, name) in routes"
                        :key="name"
                        :to="{ name }"
                        exact
                        exact-active-class="active"
                        :active="activeRoute === name"
                        :disabled="!$loyalty.validate(licensee) || commingSoon"
                        :class="classNames.link"
                    >
                        {{ text }}
                        <Licensee v-if="!userHasRequiredLicensee(licensee)" :type="licensee" />
                        <ComingSoon v-if="commingSoon" />
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
        classNames() {
            return {
                link: this.$style.link,
            }
        },

        ...mapFields('breadcrumb', {
            activeRoute: 'active',
        } ),

        routes () {
            return Object.entries(breadcrumbs)
                .filter(( [ , { show }] ) => show !== false)
                .reduce((acc, route) => {
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

<style lang="scss" module>
@import '@/assets/styles/globals/colors';

.link {
    & > a {
        margin-bottom: 5px;

        &[class*="disabled"] {
            background-color: $n200;
            color: $n600;
        }

        &:not([class*="active"]):not([class*="disabled"]) {
            border: solid 1px $primary;

            &:hover {
                background-color: rgba($primary, 0.1);
            }
        }
    }
}
</style>
