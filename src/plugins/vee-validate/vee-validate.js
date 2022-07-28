/* eslint-disable import/namespace */
import Vue from "vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import es from "vee-validate/dist/locale/es.json";

// Custom rules
import equalValues from "./rules/equal-values";
import rut from "./rules/rut";

// Install VeeValidate rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize("es", es);

// Register it globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

// Register custom rules
extend("equalValues", equalValues);
extend("rut", rut);

// Register mixin globally
Vue.mixin({
  methods: {
    __getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : false;
    },
  },
});
