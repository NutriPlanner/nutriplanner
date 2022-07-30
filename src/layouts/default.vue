<template>
  <div fluid class="np-layout np-layout--default">
    <NavigationBar />

    <Sidebar toggle="sidebar" />

    <b-container fluid>
      <Breadcrumb />
    </b-container>

    <b-container fluid class="py-3">
      <Nuxt />
    </b-container>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style lang="scss" scoped></style>
