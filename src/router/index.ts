import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '../views/index'
import { MapsView } from '../views/maps/index'
import { NewsDetailView, NewsView } from '../views/news/index'
import { RecomendationsView, RecomendationsDetailView } from '../views/recomendations/index'
import { QuizView, QuizDetailView } from '../views/quiz/index'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/noticias',
      name: 'news',
      children: [
        {
          path: '',
          name: 'news-list',
          component: NewsView
        },
        {
          path: ':id',
          name: 'news-detail',
          component: NewsDetailView,
          props: true
        }
      ]
    },
    {
      path: '/mapas',
      name: 'maps',
      children: [
        {
          path: '',
          name: 'map-view',
          component: MapsView
        }
      ]
    },
    {
      path: '/quiz',
      name: 'quiz',
      children: [
        {
          path: '',
          name: 'quiz-list',
          component: QuizView
        },
        {
          path: ':id',
          name: 'quiz-detail',
          component: QuizDetailView,
          props: true
        }
      ]
    },
    {
      path: '/recomendacoes',
      name: 'recomendations',
      children: [
        {
          path: '',
          name: 'recomendation-view',
          component: RecomendationsView
        },
        {
          path: ':id',
          name: 'recomendation-detail',
          component: RecomendationsDetailView,
          props: true
        }
      ]
    }
  ]
})

export default router
