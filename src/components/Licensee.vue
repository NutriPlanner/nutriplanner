<template>
    <div :class="classNames.licensee">
        <b-badge pill :class="classNames.badge">
            <i class="ri-award-line" /> {{ licenseeName }}
        </b-badge>
    </div>
</template>

<script>
import cx from 'classnames'
import { licensee } from '@/config/licensees'

export default {
    name: 'LicenseeComponent',

    props: {
        type: {
            type     : String,
            required : true,
        },
    },

    computed: {
        classNames() {
            return {
                licensee : this.$style.licensee,
                badge    : cx(this.$style.badge, {
                    [this.$style.licenseePro] : this.type === licensee.PRO,
                    [this.$style.licenseeAdv] : this.type === licensee.ADV,
                } ),
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
}

.licensee {
    display: inline-block;
}

.licenseePro {
    color: $font-color;
    background: linear-gradient(23deg, rgba(251,216,147,1) 0%, rgba(255,220,113,1) 50%, rgba(255,175,16,1) 100%);
}

.licenseeAdv {
    color: $font-color;
    background: linear-gradient(23deg, rgba(235,235,235,1) 0%, rgba(230,230,255,1) 35%, rgba(253,225,255,1) 100%);
}

</style>
