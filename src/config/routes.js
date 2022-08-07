export const routesNames = {
    LOGIN                 : 'login',
    RECOVER_PASSWORD      : 'recover-password',
    CHANGE_PASSWORD       : 'change-password',
    HOME                  : 'home',
    HOME_CLIENTS          : 'home-clients',
    HOME_CLIENTS_POST     : 'home-clients-post',
    HOME_CLIENTS_PUT      : 'home-clients-put-id',
    HOME_TRACKING         : 'home-tracking',
    HOME_TRACKING_POST    : 'home-tracking-post',
    HOME_TRACKING_PUT     : 'home-tracking-put-id',
    HOME_USER             : 'home-user',
    HOME_USER_PREFERENCES : 'home-user-preferences',
    HOME_PLAN             : 'home-plan',
    HOME_PLAN_POST        : 'home-plan-post',
    HOME_PLAN_PUT         : 'home-plan-put-id',
}

export const breadcrumbs = {
    [routesNames.HOME]: {
        text : 'inicio',
        show : false,
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
        text: 'seguimiento',
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
    [routesNames.HOME_PLAN]: {
        text: 'plan4u',
    },
    [routesNames.HOME_PLAN_POST]: {
        text : 'crear plan',
        show : false,
    },
    [routesNames.HOME_PLAN_PUT]: {
        text : 'editar plan',
        show : false,
    },
}
