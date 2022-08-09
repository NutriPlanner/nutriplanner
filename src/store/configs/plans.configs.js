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
        key        : 'name',
        label      : 'Nombre',
        sortable   : true,
        filterable : true,
        tdClass    : 'align-middle',
    },
    {
        key        : 'sessions_count',
        label      : 'Nro. Sesiones',
        sortable   : false,
        filterable : false,
        tdClass    : 'align-middle',
        thStyle    : 'width: 150px',
    },
    {
        key        : '__actions',
        label      : 'Acciones',
        sortable   : false,
        filterable : false,
        thStyle    : 'width: 125px',
    },
]

export default {
    tableFields,
}
