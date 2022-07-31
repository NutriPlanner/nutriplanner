export default function ( { store, route } ) {
    store.dispatch('breadcrumb/setup', route.fullPath)
}
