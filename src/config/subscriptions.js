import { licensee } from "./licensees"

export const subscriptionName = {
    [licensee.BASIC] : 'Basic',
    [licensee.PRO]   : 'Professional',
    [licensee.ADV]   : 'Advanced',
}

export const subscriptionPrice = {
    [licensee.BASIC]: {
        monthly : '$9.990',
        yearly  : {
            price            : '$109.880',
            propMonthlyPrice : '$9.158',
        },
    },
    [licensee.PRO]: {
        monthly : '$29.990',
        yearly  : {
            price            : '$299.990',
            propMonthlyPrice : '$24.992',
        },
    },
    [licensee.ADV]: {
        monthly : '$29.990',
        yearly  : {
            price            : '$299.990',
            propMonthlyPrice : '$24.992',
        },
    },
}

const basicFeatures = [
    'Mantenedor de clientes',
    'Registro de seguimientos manuales',
]

const proFeatures = [
    ...basicFeatures,
    'Creación de planes',
    'Asignación de objetivos a clientes',
    'Generación automática de seguimientos en base a objetivos',
    'Seguimientos pendientes',
]

export const subscriptionFeatures = {
    [licensee.BASIC] : basicFeatures,
    [licensee.PRO]   : proFeatures,
    [licensee.ADV]   : [],
}
