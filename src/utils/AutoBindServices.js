export const getBindedServices = (services, ctx) => {
    const bindedServices = {}

    Object.entries(services).forEach( ( [ key, service ] ) => {
        bindedServices[key] = service.bind(ctx)
    } )

    return bindedServices
}
