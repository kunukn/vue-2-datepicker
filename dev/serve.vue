<template>
  <div id="app">
    <Demo />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Demo from './Demo.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    Demo,
  },
})
</script>

<style lang="scss">
// @import url(https://unpkg.com/ress/dist/ress.min.css);

* {
  box-sizing: border-box;
}
</style>
