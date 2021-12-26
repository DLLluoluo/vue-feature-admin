<template>
  <transition name="message">
    <div class="toastWrap" v-if="toastShow" v-html="toastVal"></div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
}
</script>

<style scoped lang="scss">
</style>