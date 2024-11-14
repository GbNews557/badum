<template>
  <router-link
    :to="routerTo"
    class="button-content"
    :class="['generic-button', customClass]"
    :style="{ backgroundColor: backgroundColor }"
  >
    <span :style="{ color: fontColor }">{{ text }}</span>
    <img :src="icon" :alt="alt" />
  </router-link>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GenericButton',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    routerTo: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      required: true
    },
    fontColor: {
      type: String,
      required: false
    },
    customClass: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>
.generic-button {
  border-radius: 20px;
  padding: 5px 25px;
  display: inline-block;
  text-decoration: none;
}

.button-content {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.button-content span {
  margin-right: 8px;
}
</style>
