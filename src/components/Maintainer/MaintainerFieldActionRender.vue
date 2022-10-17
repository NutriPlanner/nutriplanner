<template>
    <div :class="classNames.wrapper">
        <DataTableButton @click="$emit('edit', data.item)">
            Editar
        </DataTableButton>

        <DataTableButton v-if="showDeleteButton" variant="outline-danger" @click="onDelete">
            Eliminar
        </DataTableButton>
    </div>
</template>

<script>
export default {
    name  : 'MaintainerFieldActionRenderComponent',
    props : {
        data: {
            type     : Object,
            required : true,
        },
        showDeleteButton: {
            type     : Boolean,
            required : false,
            default  : true,
        },
    },
    computed: {
        classNames() {
            return {
                wrapper: this.$style.wrapper,
            }
        },
    },
    methods: {
        async onDelete () {
            const confirmed = await this.$bvModal.msgBoxConfirm(
                '¿Está seguro de deseas eliminar este registro? Esta operación no es reversible.',
                {
                    title         : 'Confirmar eliminación',
                    okVariant     : 'danger',
                    okTitle       : 'Eliminar',
                    cancelVariant : 'outline-primary',
                    cancelTitle   : 'Cancelar',
                },
            )

            if (confirmed)
                this.$emit('delete', this.data.item.id)
        },
    },
}
</script>

<style lang="scss" module>
.wrapper {
    white-space: nowrap;
}
</style>
