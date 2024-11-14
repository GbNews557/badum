<template>
  <div>
    <nav class="navigator">
      <section class="logo">
        <span> <img :src="logoSvg" alt="Ecoway logo" /></span>
        <span>ECOWAY</span>
      </section>
      <section class="nav-itens">
        <ul class="list">
          <li v-for="(tab, index) in tabs" :key="index" class="item">
            <router-link :to="getTabRoute(tab)" :class="{ active: activeTab === tab }">
              {{ tab }}
            </router-link>
          </li>
        </ul>
      </section>
      <section class="advertising">
        <router-link :to="'/advertising'"> Anuncie aqui </router-link>
        <span>
          <img :src="advertisingIcon" alt="Icone de anuncio" />
        </span>
      </section>
    </nav>
  </div>
</template>

<script lang="ts">
import advertisingIcon from '../assets/icons/advertisingIcon.svg'
import logoSvg from '../assets/images/logo.svg'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const tabs = ['Home', 'Notícias', 'Mapa turístico', 'Quiz', 'Recomendações']
    const activeTab = ref('Home')
    const route = useRoute()

    const getTabRoute = (tab: string) => {
      switch (tab) {
        case 'Home':
          return { name: 'home' }
        case 'Notícias':
          return { name: 'news-list' }
        case 'Mapa turístico':
          return { name: 'map-view' }
        case 'Quiz':
          return { name: 'quiz-list' }
        case 'Recomendações':
          return { name: 'recomendation-view' }
        default:
          return { name: 'home' }
      }
    }

    return { tabs, activeTab, getTabRoute, route, logoSvg, advertisingIcon }
  }
}
</script>

<style>
@import '../assets/base.css';

.navigator {
  display: flex;
  color: var(--black);
  justify-content: space-around;
  align-items: center;
  padding: 0px 70px;
}

.navigator .list {
  list-style-type: none;
  padding: 0;
}

.navigator .list .item {
  display: inline-block;
  margin: var(--header-itens-gap);
}

.navigator .list .item.router-link-active {
  font-weight: bold;
}

.nav-itens {
  margin-left: auto;
}

.nav-itens .list a {
  color: var(--black);
  font-weight: 400;
  font-size: 18px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo span {
  font-weight: 600;
  font-size: 20px;
}

.logo span:nth-of-type(2) {
  margin-left: 10px;
}

.advertising a {
  font-size: 12px;
  color: var(--black);
  font-weight: 600;
}

.advertising {
  background-color: var(--primary-color);
  border-radius: 20px;
  padding: 5px 35px;
  display: flex;
  align-items: center;
}

.advertising span {
  margin-left: 9px;
}
</style>
