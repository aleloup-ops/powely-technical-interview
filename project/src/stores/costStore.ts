import { defineStore } from 'pinia'
import axios from 'axios'
import { useStorage } from '@vueuse/core'

export type State = {
  costs: any[],
}

export const useCostStore = defineStore('cost', {
  state: (): State => ({
    costs: useStorage('costs', [] as any[]),
  }),
  getters: {
      getCosts: (state) => state.costs,
  },
  actions: {
    registerCost(cost: any): void {
      this.costs.push(cost)
      console.log(this.costs);
      // axios.post('http://localhost:3000/costs', cost).then((response) => {
      //   console.log(response)
      // }).catch((error) => {
      //   console.log(error)
      // });
    },
    deleteCost(cost: any): void {
      this.costs.splice(this.costs.indexOf(cost), 1)
      // axios.delete('http://localhost:3000/costs/' + cost.id).then((response) => {
      //   console.log(response)
      // }).catch((error) => {
      //   console.log(error)
      // });
    },
    updateCost(cost: any): void {
      this.costs[this.costs.findIndex((element: any) => element.costName === cost.costName)] = cost
      // axios.put('http://localhost:3000/costs/' + cost.id, cost).then((response) => {
      //   console.log(response)
      // }).catch((error) => {
      //   console.log(error)
      // });
    },
  },
})
