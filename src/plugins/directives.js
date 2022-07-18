import Vue from 'vue'

// Directives
import uppercase from '../directives/uppercase'
import length from '../directives/length'

Vue.directive('input-upper', uppercase)
Vue.directive('input-max-length', length)
