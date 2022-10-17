<template>
    <div :class="classNames.wrapper">
        <b-row
            no-gutters
            align-v="center"
        >
            <b-col cols="auto">
                <div :class="classNames.dot" />
            </b-col>

            <b-col cols="auto">
                <span :class="classNames.title">{{
                    $attrs.title
                }}</span>
                <span :class="classNames.description">({{ $attrs.description }})</span>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import cx from 'classnames'
import { StatusVariants } from '@/store/configs/trackings.configs'

export default {
    name: 'StatusRenderComponent',

    computed: {
        classNames() {
            return {
                wrapper : this.$style.wrapper,
                dot     : cx(this.$style.dot, {
                    [this.$style.dotPending] : this.$attrs.variant === StatusVariants.PENDING,
                    [this.$style.dotDone]    : this.$attrs.variant === StatusVariants.DONE,
                    [this.$style.dotClosed]  : this.$attrs.variant === StatusVariants.CLOSED,
                } ),
                title       : this.$style.title,
                description : this.$style.description,
            }
        },
    },
}
</script>

<style lang="scss" module>
@import '@/assets/styles/globals/colors';

.wrapper {
  text-align: center;
}

.dot {
    height: 4px;
    width: 4px;
    border-radius: 50%;
    margin-right: 10px;
}

.dotPending {
    background-color: $y700;
}

.dotDone {
    background-color: $g500;
}

.dotClosed {
    background-color: $r900;
}

.title {
    display: block;
    font-size: 0.8rem;
}

.description {
    display: block;
    font-size: 0.6rem;
}
</style>
