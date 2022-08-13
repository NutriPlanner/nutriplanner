<template>
    <div class="np-component np-component--licensee">
        <b-badge pill :class="`licensee-${licenseeName.toLowerCase()}`">
            <i class="ri-award-line" /> {{ licenseeName }}
        </b-badge>
    </div>
</template>

<script>
import { licensees } from '@/config/licensees'

export default {
    name: 'LicenseeComponent',

    props: {
        type: {
            type     : String,
            required : true,
        },
    },

    computed: {
        licenseeName() {
            return this.type.toUpperCase()
        },
    },
}
</script>

<style lang="scss" scoped>

$font-color: rgb(42, 42, 42);

.np-component--licensee {
    display: inline-block;
}

[class*="licensee-"] {
    padding: 3px 8px;

    i {
        font-size: 1rem;
        vertical-align: sub;
    }
}

.licensee-pro {
    color: $font-color;
    background: linear-gradient(23deg, rgba(251,216,147,1) 0%, rgba(255,220,113,1) 50%, rgba(255,175,16,1) 100%);
}

.licensee-adv {
    color: $font-color;
    background: linear-gradient(23deg, rgba(235,235,235,1) 0%, rgba(230,230,255,1) 35%, rgba(253,225,255,1) 100%);
}

</style>
