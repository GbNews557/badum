<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRecomendationsStore } from '../../stores/recomendations.store'
import ItemList from '../../components/ItemList.vue'

interface RecomendationItem {
  id: string
  title: string
  shortDescription: string
  imgPath: string
}

export default defineComponent({
  components: { ItemList },
  setup() {
    const recomendationsStore = useRecomendationsStore()
    const recomendationsList = ref<RecomendationItem[]>([])

    onMounted(async () => {
      await recomendationsStore.fetchRecomendations()

      recomendationsList.value = recomendationsStore.recomendations.map((recomendation) => ({
        id: recomendation._id ?? '',
        title: recomendation.name,
        shortDescription: recomendation.description,
        imgPath:
          Array.isArray(recomendation.images) && recomendation.images.length > 0
            ? recomendation.images[0].url
            : ''
      }))
    })

    return { recomendationsList }
  }
})
</script>

<template>
  <main>
    <ItemList :items="recomendationsList" imgWidth="450px" imgHeight="250px" path="noticias" />
  </main>
</template>

<style scoped>
main {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
