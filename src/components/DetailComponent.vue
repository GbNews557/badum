<template>
  <section class="detail">
    <div class="description">
      <h1 class="title">{{ title }}</h1>
      <p class="short-description">{{ shortDescription }}</p>
      <div class="button-container">
        <EcowayButton
          text="Ver mais"
          :routerTo="`/${path}/${id}`"
          :icon="eyeIcon"
          :backgroundColor="primaryColor"
          alt="Icone de olho"
        />
      </div>
    </div>
    <img class="image" :src="imgPath" :width="imgWidth" :height="imgHeight" alt="Trilha" />
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import EcowayButton from './EcowayButton.vue'
import eyeIcon from '../assets/icons/eyeIcon.svg'

export default defineComponent({
  name: 'DetailComponent',
  components: { EcowayButton },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    imgPath: {
      type: String,
      required: true
    },
    imgWidth: {
      type: String,
      required: true
    },
    imgHeight: {
      type: String,
      required: true
    }
  },
  setup() {
    const primaryColor = 'var(--primary-color)'
    return { eyeIcon, primaryColor }
  }
})
</script>

<style scoped>
.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 35px;
  padding: 30px 0px;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.image {
  border-radius: 20px;
}
</style>
