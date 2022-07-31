import Vue from 'vue'

// Directives
import uppercase from '../directives/uppercase'
import length from '../directives/length'
import rut from '../directives/rut'
import decimals from '../directives/decimals'

Vue.directive('input-upper', uppercase)
Vue.directive('input-max-length', length)
Vue.directive('input-rut', rut)
Vue.directive('input-max-decimals', decimals)
