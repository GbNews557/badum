<template>
  <div>
    <main>
      <section class="top">
        <div class="description">
          <h1 class="title">
            {{ wordsArray }} <span class="highlight">{{ lastWord }}</span>
          </h1>
          <p class="short-description">{{ shortDescription }}</p>
          <div class="button-container">
            <EcowayButton
              text="Ver mais"
              :routerTo="'/noticias/' + id"
              :icon="eyeIcon"
              :backgroundColor="primaryColor"
              alt="Icone de olho"
            />
          </div>
        </div>
        <div class="img">
          <img class="news-image" :src="imgPath" alt="Trilha" />
        </div>
      </section>
      <section class="mid">
        <div class="quiz">
          <div class="description-container">
            <h3 class="quiz-description">{{ quizDescription }}</h3>
            <p>Responda ao quiz e descubra!</p>
            <div class="button-container">
              <EcowayButton
                text="Quiz"
                :routerTo="'/quiz/' + quizId"
                :icon="quizIcon"
                :backgroundColor="primaryColor"
                alt="Icone lapis"
              />
            </div>
          </div>
          <img class="quiz-image" :src="quizImgPath" alt="quiz image" />
        </div>
        <div class="advertising">
          <div class="advertising-container">
            <h3 class="advertising-title">{{ recomendationTitle }}</h3>
            <p class="advertising-description">{{ recomendationDescription }}</p>
            <div class="star-co">
              <div class="button-container">
                <EcowayButton
                  text="Ver mais"
                  :routerTo="'/recomendacoes/' + recomendationId"
                  :icon="eyeIconWhite"
                  :backgroundColor="blackColor"
                  :fontColor="whiteColor"
                  alt="Icone de olho"
                />
              </div>
            </div>
          </div>
          <div class="img">
            <img :src="recomendationImgPath" alt="advertising image" />
          </div>
        </div>
      </section>
      <section class="botton">
        <h1>Não sabe o que fazer em Saquarema?</h1>
        <p>
          Acesse nosso mapa turístico e encontre a localização de um ponto de ecoturismo perto de
          você!
        </p>
        <EcowayButton
          text="Acessar mapa"
          routerTo="/mapas"
          :icon="eyeIcon"
          :backgroundColor="tertiaryColor"
          :fontColor="whiteColor"
          alt="Icone de mapa"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import eyeIcon from '../assets/icons/eyeIcon.svg'
import eyeIconWhite from '../assets/icons/eyeIconWhite.svg'
import quizIcon from '../assets/icons/quizIcon.svg'

import EcowayButton from '../components/EcowayButton.vue'

import { useNewsStore } from '../stores/news.store'
import { useRecomendationsStore } from '../stores/recomendations.store'
import { useQuizStore } from '../stores/quiz.store'

export default defineComponent({
  components: { EcowayButton },
  setup() {
    const newsStore = useNewsStore()
    const recomendationStore = useRecomendationsStore()
    const quizStore = useQuizStore()

    const id = ref<string>('')
    const title = ref<string>('Title')
    const shortDescription = ref<string>('')
    const imgPath = ref<string>('')

    const recomendationId = ref<string>()
    const recomendationTitle = ref<string>()
    const recomendationDescription = ref<string>()
    const recomendationImgPath = ref<string>()

    const quizId = ref<string>()
    const quizImgPath = ref<string>()
    const quizDescription = ref<string>()
    onMounted(async () => {
      await newsStore.fetchLatestNews()
      await recomendationStore.fetchLatest()
      await quizStore.fetchLatestQuiz()

      const newsResponse = newsStore.latestNews
      const recomendationResponse = recomendationStore.recomendationDetail
      const quizResponse = quizStore.latestQuiz

      id.value = newsResponse._id!
      title.value = newsResponse.title
      shortDescription.value = `${newsResponse.text_body[0].substring(0, 110)}[...]`
      imgPath.value = newsResponse.images![0].url

      const newTitle = document.querySelector('.title')
      newTitle!.textContent = title.value

      recomendationId.value = recomendationResponse._id
      recomendationTitle.value = recomendationResponse.name
      recomendationDescription.value = recomendationResponse.description
      recomendationImgPath.value = recomendationResponse.images[0].url

      quizId.value = quizResponse._id
      quizImgPath.value = quizResponse.quiz_image
      quizDescription.value = quizResponse.quiz_description
    })

    const primaryColor = 'var(--primary-color)'
    const tertiaryColor = 'var(--tertiary-color)'
    const blackColor = 'var(--black)'
    const whiteColor = 'var(--white)'

    function sanitizeNewsTitle(title: string) {
      const wordsArray = title.toString().split(' ')
      const lastWord = wordsArray.pop()
      return { wordsArray: wordsArray.join(' '), lastWord }
    }

    const { wordsArray, lastWord } = sanitizeNewsTitle(title.value)

    return {
      title,
      shortDescription,
      imgPath,
      quizId,
      quizDescription,
      quizImgPath,
      recomendationId,
      recomendationImgPath,
      recomendationTitle,
      recomendationDescription,
      eyeIcon,
      quizIcon,
      eyeIconWhite,
      primaryColor,
      tertiaryColor,
      blackColor,
      whiteColor,
      wordsArray,
      lastWord,
      id
    }
  }
})
</script>

<style scoped>
@import '../assets/base.css';

main {
  border-radius: 20px;
  padding: 70px;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
}

.top {
  display: flex;
  gap: 62px;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 30px 70px;
}

.title {
  font-weight: 600;
  font-size: 50px;
}

.highlight {
  font-weight: 600;
  background-color: var(--secondary-color);
  border-radius: 20px;
}

.short-description {
  font-size: 18px;
  font-weight: 400;
  color: var(--tertiary-color);
  text-align: center;
  padding: 20px;
}

.button-container {
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mid,
.quiz {
  display: flex;
}

.quiz {
  margin: 30px 70px;
  gap: 31px;
}

.quiz-description {
  font-size: 18px;
  font-weight: 600;
}

.description-container {
  max-width: 650px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.description-container p {
  font-size: 15px;
  font-weight: 400;
}

.advertising {
  padding: 27px;
  background-color: var(--secondary-color);
  gap: 37px;
}

.advertising-container {
  max-width: 350px;
}

.advertising-title {
  font-weight: 600;
  font-size: 22px;
}

.advertising-description {
  font-weight: 400;
  font-size: 12px;
}

.botton {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20vh;
  justify-content: space-evenly;
}

.news-image {
  width: 660px;
  height: 438px;
  border-radius: 20px;
}

.quiz-image {
  width: 225px;
  height: 160px;
}
</style>
