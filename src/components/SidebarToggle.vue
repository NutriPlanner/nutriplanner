<template>
    <div>
        <b-button
            v-b-toggle="target"
            size="sm"
            class="mr-4"
            variant="outline-primary"
        >
            <i class="ri-menu-2-fill" />
        </b-button>
    </div>
</template>

<script>
export default {
    name  : 'SidebarToggleComponent',
    props : {
        target: {
            type    : String,
            default : 'sidebar',
        },
    },
}
</script>
