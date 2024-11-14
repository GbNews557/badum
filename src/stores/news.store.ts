import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'

export interface Image {
  title: string
  img_base64: string
  photographer_name: string
  photographed_at?: Date
  url: string
}

export interface News {
  _id?: string
  title: string
  subtitles: string[]
  text_body: string[]
  images?: Image[]
  map_id?: string
  created_by: string
  created_at: Date
}

const newsInstance = axios.create({
  baseURL: 'http://localhost:4000/news',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    news: [] as News[],
    newsDetail: {} as News,
    latestNews: {} as News
  }),
  getters: {
    getNewsImages: (state) => state.newsDetail.images?.forEach((news) => news.url)
  },
  actions: {
    async fetchNews() {
      const response: AxiosResponse<News[]> = await newsInstance.get(``)
      this.news = response.data
    },
    async fetchNewById(id: string) {
      const response: AxiosResponse<News> = await newsInstance.get(`/${id}`)
      this.newsDetail = response.data
    },
    async fetchLatestNews() {
      const response: AxiosResponse<News[]> = await newsInstance.get('/latest')
      this.latestNews = response.data[0]
    }
  }
})
