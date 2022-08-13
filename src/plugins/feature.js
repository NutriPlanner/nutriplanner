import Vue from 'vue'
import { feature, featureProps } from '@/config/features'

Vue.prototype.$feature = {
    ...feature,
    props(name) {
        return featureProps[name]
    },
}
