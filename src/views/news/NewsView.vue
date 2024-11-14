<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useNewsStore } from '../../stores/news.store'
import ItemList from '../../components/ItemList.vue'

interface NewsItem {
  id: string
  title: string
  shortDescription: string
  imgPath: string
}

export default defineComponent({
  components: { ItemList },
  setup() {
    const newsStore = useNewsStore()
    const newsList = ref<NewsItem[]>([])

    onMounted(async () => {
      await newsStore.fetchNews()
      newsList.value = newsStore.news.map((news) => ({
        id: news._id ?? '',
        title: news.title,
        shortDescription: `${news.text_body[0].substring(0, 110)}[...]`,
        imgPath: Array.isArray(news.images) && news.images.length > 0 ? news.images[0].url : ''
      }))
    })

    return { newsList }
  }
})
</script>

<template>
  <main>
    <ItemList :items="newsList" imgWidth="450px" imgHeight="250px" path="noticias" />
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
