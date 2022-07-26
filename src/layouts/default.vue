<template>
  <div fluid class="np-layout np-layout--default">
    <NavigationBar />

    <Sidebar toggle="sidebar" />

    <b-container fluid>
      <Breadcrumb />
    </b-container>

    <b-container class="py-3">
      <Nuxt />
    </b-container>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue'
export default {
  name: 'DefaultLayout',
  components: { Breadcrumb }
}
</script>

<style lang="scss" scoped>

</style>
