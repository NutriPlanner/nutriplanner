import { format as formatRut } from "rut.js";

export default {
  bind(el, _, vnode) {
    // rut transform
    el.transformRut = function () {
      let newValue = formatRut(el.value, { dots: false });
      newValue = newValue === "-" ? "" : newValue;
      el.value = newValue;
    };

    // add event listener
    el.addEventListener("change", function () {
      el.transformRut();
    });
  },

  unbind(el) {
    el.removeEventListener("change", el.transformRut);
  },
};
