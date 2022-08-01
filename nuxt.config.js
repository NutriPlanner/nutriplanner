export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: true,

    server: {
        port : 3000,
        host : '0.0.0.0',
    },

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title : 'nutriplanner',
        meta  : [
            { charset: 'utf-8' },
            {
                name    : 'viewport',
                content :
          'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [ '@/assets/styles/app.scss', 'remixicon/fonts/remixicon.css' ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/vee-validate/vee-validate.js',
        '@/plugins/directives.js',
        '@/plugins/mixins.js',
        '@/plugins/axios-setup.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'es',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [ 'vee-validate/dist/rules' ],
    },

    srcDir: 'src/',

    router: {
        middleware: [ 'auth', 'breadcrumb' ],
        extendRoutes (routes, resolve) {
            routes.push( {
                name      : 'custom',
                path      : '*',
                component : resolve(__dirname, 'src/pages/login.vue'),
            } )
        },
    },

    auth: {
        redirect: {
            login    : '/login',
            logout   : '/login',
            callback : false,
            home     : '/home/clients',
        },

        strategies: {
            local: {
                scheme : 'refresh',
                token  : {
                    property : 'tokens.access.token',
                    maxAge   : 3600,
                    required : true,
                    type     : 'Bearer',
                },

                refreshToken: {
                    property      : 'tokens.refresh.token',
                    data          : 'refreshToken',
                    maxAge        : 3600,
                    required      : true,
                    tokenRequired : false,
                },

                user: {
                    property  : '',
                    autoFetch : true,
                },

                endpoints: {
                    login   : { url: '/auth/login', method: 'post' },
                    refresh : { url: '/auth/refresh-tokens', method: 'post' },
                    user    : { url: '/auth/user', method: 'get' },
                    logout  : { url: '/auth/logout', method: 'post' },
                },

                autoLogout: false,
            },
        },
    },

    publicRuntimeConfig: {
        axios: {
            baseURL: process.env.NUXT_ENV_API_HOST,
        },
    },

    privateRuntimeConfig: {},
}
