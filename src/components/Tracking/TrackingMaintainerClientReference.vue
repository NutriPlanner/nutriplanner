<template>
    <div class="np-component np-component--tracking-maintainer-client-reference">
        <h4 class="m-0">
            CLI:
            <b-badge variant="tertiary" class="object-id np-component--tracking-maintainer-client-reference__badge">
                {{ clientId }}
            </b-badge>
        </h4>
    </div>
</template>

<script>
export default {
    name     : 'TrackingMaintainerClientReferenceComponent',
    computed : {
        clientId () {
            return this.$store.state.trackings.selectedClientId
        },
    },
}
</script>

<style lang="scss" scoped>
.np-component--tracking-maintainer-client-reference {
  &__badge {
    vertical-align: bottom;
  }
}
</style>
