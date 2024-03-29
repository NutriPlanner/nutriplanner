import { FieldsTypes } from '@/utils'

export const tableFields = [
    {
        key        : 'id',
        label      : 'ID',
        sortable   : false,
        filterable : true,
        type       : FieldsTypes.OBJECT_ID,
        tdClass    : 'align-middle',
        thStyle    : 'width: 210px; min-width: 100px;',
    },
    {
        key        : 'name',
        label      : 'Nombre',
        sortable   : true,
        filterable : true,
    },
    {
        key        : 'last_name',
        label      : 'Apellido',
        sortable   : true,
        filterable : true,
    },
    {
        key        : 'dni',
        label      : 'DNI',
        sortable   : true,
        filterable : true,
        tdClass    : 'tabular-nums',
    },
    {
        key         : 'birthday',
        label       : 'Fecha Nacimiento',
        sortable    : true,
        filterable  : true,
        type        : FieldsTypes.DATE,
        showInTable : false,
    },
    {
        key         : 'address',
        label       : 'Dirección',
        sortable    : true,
        filterable  : true,
        showInTable : false,
    },
    {
        key         : 'phone',
        label       : 'Teléfono',
        sortable    : true,
        filterable  : true,
        tdClass     : 'tabular-nums',
        showInTable : false,
    },
    {
        key        : 'email',
        label      : 'Email',
        sortable   : true,
        filterable : true,
    },
    {
        key        : '__actions',
        label      : 'Acciones',
        sortable   : false,
        filterable : false,
    },
]

const GOAL_STATUS = {
    INCOMPLETE : 'INCOMPLETE',
    COMPLETED  : 'COMPLETED',
}

export const goalStatusOptions = [
    { text: 'INCOMPLETO', value: 'INCOMPLETE' },
    { text: 'COMPLETADO', value: 'COMPLETED' },
]

export default {
    tableFields,
    goalStatusOptions,
    GOAL_STATUS,
}
