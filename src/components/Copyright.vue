<template>
    <div class="np-component np-component--copyright">
        <div class="py-3">
            <span class="np-component--copyright__text">
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
