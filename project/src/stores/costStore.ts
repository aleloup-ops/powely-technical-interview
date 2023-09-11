import { defineStore } from 'pinia'
import { CostCreation } from '../components/CostCreation.vue'
import axios from 'axios'

export type State = {
  costs: CostCreation[]
}

export const useCostStore = defineStore('cost', {
  state: (): State => ({
    costs: [],
  }),
  getters: {
      getCosts: (state) => state.costs,
  },
  actions: {
    registerCost(cost: CostCreation): void {
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
    }
  },
})
