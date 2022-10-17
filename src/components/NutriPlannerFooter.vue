<template>
    <div>
        <div class="py-3 text-center">
            <span>
                <small>Para contactarse con soporte, puede hacerlo a través de <a href="mailto:support@nutriplanner.life">support@nutriplanner.life</a></small>
            </span>
        </div>

        <div class="py-3 text-center">
            <b-btn variant="outline-primary">
                <small class="no-transform">Ver {{ version }}</small>
            </b-btn>
        </div>
    </div>
</template>

<script>
import { version } from '@@/package.json'

export default {
    name: 'NutriPlannerFooterComponent',

    data() {
        return {
            version,
        }
    },
}
</script>
