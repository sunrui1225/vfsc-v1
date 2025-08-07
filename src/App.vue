<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to, from) {
      console.log('router form %s to %s', from.name, to.name)
    }
  }
}
</script>
