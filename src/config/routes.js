import { feature, requiredLicensee } from '@/config/features'

export const routesNames = {
    LOGIN                 : 'login',
    RECOVER_PASSWORD      : 'recover-password',
    CHANGE_PASSWORD       : 'change-password',
    HOME                  : 'home',
    ANALYTICS             : 'analytics',
    HOME_CLIENTS          : 'home-clients',
    HOME_CLIENTS_POST     : 'home-clients-post',
    HOME_CLIENTS_PUT      : 'home-clients-put',
    HOME_TRACKING         : 'home-tracking',
    HOME_TRACKING_POST    : 'home-tracking-post',
    HOME_TRACKING_PUT     : 'home-tracking-put',
    HOME_USER             : 'home-user',
    HOME_USER_PREFERENCES : 'home-user-preferences',
    HOME_PLANS            : 'home-plans',
    HOME_PLANS_POST       : 'home-plans-post',
    HOME_PLANS_PUT        : 'home-plans-put',
    APPOINTMENTS          : 'home-appointments',
}

export const breadcrumbs = {
    [routesNames.HOME]: {
        text        : 'resumen',
        show        : true,
        commingSoon : true,
    },
    [routesNames.ANALYTICS]: {
        text        : 'analítica',
        show        : true,
        commingSoon : true,
    },
    [routesNames.HOME_CLIENTS]: {
        text: 'clientes',
    },
    [routesNames.HOME_CLIENTS_POST]: {
        text : 'crear cliente',
        show : false,
    },
    [routesNames.HOME_CLIENTS_PUT]: {
        text : 'editar cliente',
        show : false,
    },
    [routesNames.HOME_TRACKING]: {
        text: 'seguimientos',
    },
    [routesNames.HOME_TRACKING_POST]: {
        text : 'crear seguimiento',
        show : false,
    },
    [routesNames.HOME_TRACKING_PUT]: {
        text : 'editar seguimiento',
        show : false,
    },
    [routesNames.HOME_USER]: {
        text : 'usuario',
        show : false,
    },
    [routesNames.HOME_USER_PREFERENCES]: {
        text : 'preferencias',
        show : false,
    },
    [routesNames.HOME_PLANS]: {
        text     : 'planes',
        licensee : requiredLicensee(feature.PLANS),
    },
    [routesNames.HOME_PLANS_POST]: {
        text : 'crear plan',
        show : false,
    },
    [routesNames.HOME_PLANS_PUT]: {
        text : 'editar plan',
        show : false,
    },
    [routesNames.APPOINTMENTS]: {
        text        : 'citas',
        show        : true,
        commingSoon : true,
    },
}
