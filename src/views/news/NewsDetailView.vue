<template>
  <main>
    <div class="title">
      <h1>{{ title }}</h1>
      <aside>Por {{ createrName }} - {{ location }}</aside>
      <aside>{{ createdAt }}</aside>
    </div>
    <div class="img">
      <img :src="mainImage" alt="Trilha" />
    </div>
    <h3 class="sub-title">{{ subTitle1 }}</h3>
    <p class="article-body">{{ body1 }}</p>
    <h3 class="sub-title">{{ subTitle2 }}</h3>
    <p class="article-body">{{ body2 }}</p>
    <div class="img">
      <img :src="bodyImage1" alt="Cachoeira" />
    </div>
    <h3 class="sub-title">{{ subTitle3 }}</h3>
    <p class="article-body">{{ body3 }}</p>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useNewsStore } from '../../stores/news.store'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const mainImage = ref<string>('')
    const bodyImage1 = ref<string>()
    const title = ref<string>()
    const createrName = ref<string>()
    const location = ref<string>()
    const createdAt = ref<string>()
    const subTitle1 = ref<string>()
    const body1 = ref<string>()
    const subTitle2 = ref<string>()
    const body2 = ref<string>()
    const subTitle3 = ref<string>()
    const body3 = ref<string>()
    const newsStore = useNewsStore()

    onMounted(async () => {
      await newsStore.fetchNewById(props.id)
      const res = newsStore.newsDetail

      if (Array.isArray(res.images) && res.images.length > 0) {
        mainImage.value = res.images[0].url
        bodyImage1.value = res.images[1].url
      }

      title.value = res.title
      createrName.value = res.created_by
      location.value = res.created_at.toLocaleString('pt-br')
      createdAt.value = res.created_at.toString()
      subTitle1.value = res.subtitles[0]
      body1.value = res.text_body[0]
      subTitle2.value = res.subtitles[1]
      body2.value = res.text_body[1]
      subTitle3.value = res.subtitles[2]
      body3.value = res.text_body[2]
    })

    return {
      title,
      createrName,
      location,
      createdAt,
      mainImage,
      subTitle1,
      body1,
      subTitle2,
      body2,
      bodyImage1,
      subTitle3,
      body3,
      newsStore
    }
  }
})
</script>

<style scoped>
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 0;
}

.article-body {
  text-align: justify;
}

.sub-title {
  font-weight: bold;
  margin-top: 20px;
}

.img {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.img img {
  max-width: 100%;
  height: auto;
}
</style>
