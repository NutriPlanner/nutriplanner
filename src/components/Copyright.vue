<template>
    <div>
        <div class="py-3">
            <span>
                <small>NutriPlanner © Todos los derechos reservados - {{ currentYear }}</small>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name     : 'CopyrightComponent',
    computed : {
        currentYear() {
            return new Date().getFullYear()
        },
    },
}
</script>
