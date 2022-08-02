export default {
    bind (el, { value }, vnode) {
        el.setMaxLength = function () {
            if (el.value.length > value) {
                const newValue = el.value.substring(0, value)
                el.value = newValue
                vnode.componentInstance.$emit('input', newValue)
            }
        }

        // add event listener
        el.addEventListener('input', function () {
            el.setMaxLength()
        } )
    },

    unbind (el) {
        el.removeEventListener('input', el.setMaxLength)
    },
}
