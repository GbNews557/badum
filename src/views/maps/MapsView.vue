<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import searchIcon from '../../assets/icons/searchIcon.svg'
import eyeIcon from '../../assets/icons/eyeIcon.svg'
import eyeIconWhite from '../../assets/icons/eyeIconWhite.svg'

import { useMapsStore } from '../../stores/maps.store'
import { useNewsStore } from '../../stores/news.store'
import { useRecomendationsStore } from '../../stores/recomendations.store'

import EcowayButton from '../../components/EcowayButton.vue'

export default defineComponent({
  components: { EcowayButton },
  setup() {
    const mapsStore = useMapsStore()
    const newsStore = useNewsStore()
    const recomendationsStore = useRecomendationsStore()
    const longitude = ref<number>()
    const latitude = ref<number>()

    const newsId = ref<string>()
    const titleNews = ref<string>()
    const shortDescriptionNews = ref<string>()
    const newsImage = ref<string>()

    const recomendationsId = ref<string>()
    const titleRecomendations = ref<string>()
    const shortDescriptionRecomendations = ref<string>()
    const recomendationsImage = ref<string>()

    onMounted(async () => {
      await mapsStore.fetchMaps()
      await newsStore.fetchLatestNews()
      await recomendationsStore.fetchLatest()

      const latestNews = newsStore.latestNews
      const { geolocation } = mapsStore.getAllMaps[0]
      const recomendations = recomendationsStore.recomendationDetail

      longitude.value = geolocation.longitude
      latitude.value = geolocation.latitude

      newsId.value = latestNews._id
      titleNews.value = latestNews.title
      shortDescriptionNews.value = `${latestNews.text_body[0].substring(0, 110)}[...]`
      newsImage.value = latestNews.images![0].url

      recomendationsId.value = recomendations._id
      titleRecomendations.value = recomendations.name
      shortDescriptionRecomendations.value = recomendations.description
      recomendationsImage.value = recomendations.images[0].url
    })

    const primaryColor = 'var(--primary-color)'
    const tertiaryColor = 'var(--tertiary-color)'
    const blackColor = 'var(--black)'
    const whiteColor = 'var(--white)'

    return {
      searchIcon,
      eyeIcon,
      eyeIconWhite,
      longitude,
      latitude,
      newsId,
      titleNews,
      shortDescriptionNews,
      newsImage,
      recomendationsId,
      titleRecomendations,
      shortDescriptionRecomendations,
      recomendationsImage,
      primaryColor,
      tertiaryColor,
      blackColor,
      whiteColor
    }
  }
})
</script>

<template>
  <main>
    <h1>Encontre um ponto de <span>Ecoturismo</span> perto de você!</h1>
    <section class="search-box">
      <input type="search" name="search-maps" id="" placeholder="Pesquise no Ecoway..." />
      <span><img :src="searchIcon" alt="Ícone de procura" /></span>
    </section>
    <section>
      <iframe
        :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7745.551461745742!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9761631d5da89b%3A0xc15f50350b411c3d!2sTrilha%20da%20Pedra%20Branca%20Saquarema-RJ!5e1!3m2!1spt-BR!2sbr!4v1718485669825!5m2!1spt-BR!2sbr&t=k`"
        width="1000"
        height="450"
        frameborder="0"
        style="border-radius: 20px; border: 0"
        allowfullscreen="false"
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </section>
    <h2>Nessa região encontramos:</h2>
    <section class="bottom">
      <div class="left">
        <div class="news-text">
          <h2>{{ titleNews }}</h2>
          <p>{{ shortDescriptionNews }}</p>
          <EcowayButton
            text="Ver mais"
            :routerTo="'/noticias/' + newsId"
            :icon="eyeIcon"
            :backgroundColor="primaryColor"
            alt="Icone de olho"
          />
        </div>
        <img :src="newsImage" alt="imagem da notícia" class="news-image" />
      </div>
      <div class="right">
        <div class="recomendations-text">
          <h2>{{ titleRecomendations }}</h2>
          <p>{{ shortDescriptionRecomendations }}</p>
          <EcowayButton
            text="Ver mais"
            :routerTo="'/recomendacoes/' + recomendationsId"
            :icon="eyeIconWhite"
            :backgroundColor="blackColor"
            :fontColor="whiteColor"
            alt="Icone de olho"
          />
        </div>
        <img :src="recomendationsImage" alt="image da recomendação" class="recomendations-image" />
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-box {
  width: 510px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid grey;
  border-radius: 20px;
  margin: 20px 0px;
}

input {
  border: none;
  width: 490px;
  outline: none;
}

input:focus {
  outline: none;
}

.bottom,
.left,
.right {
  display: flex;
}

.bottom {
  height: 250px;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 0px;
  gap: 15px;
}

.left,
.right {
  width: 530px;
  height: 190px;
}

.right {
  background-color: var(--secondary-color);
  padding: 30px;
  border-radius: 20px;
}

.recomendations-text,
.news-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.recomendations-text p {
  font-size: 12px;
}

.news-image,
.recomendations-image {
  width: 230px;
  height: 150px;
  border-radius: 15px;
}
</style>
