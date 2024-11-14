<script setup lang="ts">
import { RouterView } from 'vue-router'
import { HeaderComponent } from './components/index'
</script>

<template>
  <HeaderComponent />

  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
