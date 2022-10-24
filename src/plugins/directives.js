import Vue from 'vue'

// Directives
import uppercase from '../directives/uppercase'
import length from '../directives/length'
import decimals from '../directives/decimals'

Vue.directive('input-upper', uppercase)
Vue.directive('input-max-length', length)
Vue.directive('input-max-decimals', decimals)
