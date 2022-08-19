import Vue from 'vue'
import { licenseePriority, licensee } from '@/config/licensees'

Vue.prototype.$licensee = licensee

export default (ctx, inject) => {
    inject('loyalty', {
        validate: (l = licensee.BASIC) => {
            const { licensee: userLicensee } = ctx.$auth.user || {}
            const userLicenseePriority = licenseePriority[userLicensee || licensee.BASIC]
            const requiredLicenseePriority = licenseePriority[l]

            return userLicenseePriority >= requiredLicenseePriority
        },
    } )
}
