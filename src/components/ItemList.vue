<template>
  <main>
    <DetailComponent
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :shortDescription="item.shortDescription"
      :path="path"
      :imgPath="item.imgPath"
      :imgWidth="imgWidth"
      :imgHeight="imgHeight"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import DetailComponent from './DetailComponent.vue'

export default defineComponent({
  name: 'ItemList',
  components: { DetailComponent },
  props: {
    items: {
      type: Array as PropType<
        Array<{
          id: string
          title: string
          shortDescription: string
          imgPath: string
        }>
      >,
      required: true
    },
    imgWidth: {
      type: String,
      required: true
    },
    imgHeight: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
main {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
