<template>
  <div class="main">
    Main
  </div>
</template>
<script>
import Page from 'mixin/Page'
export default {
  extends: Page({
    init_requests: ['get_bulletin']
  }),
  data () {
    return {
      // $page_info: {}
    }
  }
}
</script>
<style lang="scss">

</style>
