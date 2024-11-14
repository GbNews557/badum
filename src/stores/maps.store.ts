import axios, { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'

interface ILoc {
  latitude: number
  longitude: number
}
interface Maps {
  _id?: string
  geolocation: ILoc
  trail?: ILoc[]
}

const mapsInstance = axios.create({
  baseURL: 'http://localhost:4000/maps',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useMapsStore = defineStore('mapsStore', {
  state: () => ({
    maps: [] as Maps[]
  }),
  getters: {
    getAllMaps: (state) => state.maps
  },
  actions: {
    async fetchMaps() {
      const response: AxiosResponse<Maps[]> = await mapsInstance.get(``)
      this.maps = response.data
    }
  }
})
