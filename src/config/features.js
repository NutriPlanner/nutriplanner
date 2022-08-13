import { licensee } from '@/config/licensees'

export const feature = {
    CLIENT             : 'client',
    CLIENT_GOALS       : 'client-goals',
    TRACKINGS          : 'trackings',
    TRACKINGS_PENDINGS : 'trackings-pendings',
    PLANS              : 'plans',
}

export const featureProps = {
    [feature.CLIENT]: {
        licensee: licensee.BASIC,
    },
    [feature.CLIENT_GOALS]: {
        licensee: licensee.PRO,
    },
    [feature.TRACKINGS]: {
        licensee: licensee.BASIC,
    },
    [feature.TRACKINGS_PENDINGS]: {
        licensee: licensee.PRO,
    },
    [feature.PLANS]: {
        licensee: licensee.PRO,
    },
}

export const requiredLicensee = (featureName) => {
    return featureProps[featureName].licensee
}
