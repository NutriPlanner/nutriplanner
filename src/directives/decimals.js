export default {
    bind (el, { value }, vnode) {
        el.setMaxDecimals = function () {
            const valueSplit = el.value.split('.')
            if (valueSplit[1] && valueSplit[1] > value) {
                const newValue = valueSplit[0] + '.' + valueSplit[1].substring(0, value)
                el.value = newValue
                vnode.componentInstance.$emit('input', newValue)
            }
        }

        // add event listener
        el.addEventListener('input', function () {
            el.setMaxDecimals()
        } )
    },

    unbind (el) {
        el.removeEventListener('input', el.setMaxDecimals)
    },
}
