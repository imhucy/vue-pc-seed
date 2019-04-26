<template>
  <div id="root">
    <router-view />
  </div>
</template>

<style lang="scss">
// 全局公共样式
// 在App.vue中导入
// 避免在编译代码时出现重复代码
// 若需要导入mixin和variable写入
// src/assets/scss/mixin.scss和
// src/assets/scss/variables.scss中
@import "@/assets/scss/common.scss";
</style>
