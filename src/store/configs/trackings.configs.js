import { FieldsTypes } from '@/utils'

export const tableFields = [
    {
        key        : 'id',
        label      : 'ID',
        sortable   : false,
        filterable : true,
        type       : FieldsTypes.OBJECT_ID,
        tdClass    : 'align-middle',
        thStyle    : 'width: 210px',
    },
    {
        key        : 'subject',
        label      : 'Asunto',
        sortable   : true,
        filterable : true,
        tdClass    : 'align-middle',
    },
    {
        key        : 'status',
        label      : 'Estado',
        sortable   : true,
        filterable : true,
        thStyle    : 'width: 125px',
        tdClass    : 'align-middle text-left',
    },
    {
        key        : 'date',
        label      : 'Actualizado',
        sortable   : true,
        filterable : false,
        thStyle    : 'width: 125px',
        tdClass    : 'align-middle',
    },
    {
        key        : '__actions',
        label      : 'Acciones',
        sortable   : false,
        filterable : false,
        thStyle    : 'width: 125px',
        tdClass    : 'align-middle',
    },
]

export const statusOptions = [
    { text: 'PENDIENTE', value: 'PENDING', variant: 'warning' },
    { text: 'FINALIZADO', value: 'DONE', variant: 'success' },
    { text: 'CERRADO', value: 'CLOSED', variant: 'danger' },
]

export const getStatusOption = (status) => {
    return statusOptions.find(option => option.value === status)
}

export default {
    tableFields,
    statusOptions,
    getStatusOption,
}
