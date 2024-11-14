import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'

export interface QuizQuestion {
  question: string
  answers: string[]
  correct_answer: number
}
export interface Quiz {
  _id?: string
  quiz_description: string
  quiz_image: string
  quiz: QuizQuestion[]
  created_at: Date
}

const quizInstance = axios.create({
  baseURL: 'http://localhost:4000/quiz',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useQuizStore = defineStore('quizStore', {
  state: () => ({
    quizzes: [] as Quiz[],
    quizDetail: {} as Quiz,
    latestQuiz: {} as Quiz
  }),
  getters: {
    getQuizArray: (state) => state.quizDetail.quiz
  },
  actions: {
    async fetchLatestQuiz() {
      const response: AxiosResponse<Quiz[]> = await quizInstance.get('/latest')
      this.latestQuiz = response.data[0]
    },
    async fetchQuizById(id: string) {
      const response: AxiosResponse<Quiz> = await quizInstance.get(`/${id}`)
      this.quizDetail = response.data
    },
    async fetchAll() {
      const response: AxiosResponse<Quiz[]> = await quizInstance.get('')
      this.quizzes = response.data
    }
  }
})
