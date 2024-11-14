import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'

interface Image {
  name: string
  url: string
}
interface Recomendations {
  _id?: string
  name: string
  address: string
  phone: string
  email?: string
  site?: string
  social_media: string
  description: string
  rating?: number
  images: Image[]
  created_at: Date
  expiration_date: Date
}

const recomendationsInstance = axios.create({
  baseURL: 'http://localhost:4000/recomendations',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useRecomendationsStore = defineStore('recomendationsStore', {
  state: () => ({
    recomendationDetail: {} as Recomendations,
    recomendations: [] as Recomendations[]
  }),
  getters: {
    getAllRecomendations: (state) => state.recomendations
  },
  actions: {
    async fetchRecomendations() {
      const response: AxiosResponse<Recomendations[]> = await recomendationsInstance.get(``)
      this.recomendations = response.data
    },
    async fetchOneRecomendations(id: string) {
      const response: AxiosResponse<Recomendations> = await recomendationsInstance.get(`/${id}`)
      this.recomendationDetail = response.data
    },
    async fetchLatest() {
      const response: AxiosResponse<Recomendations[]> = await recomendationsInstance.get('/latest')
      this.recomendationDetail = response.data[0]
    }
  }
})
