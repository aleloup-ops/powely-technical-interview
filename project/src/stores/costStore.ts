import { defineStore } from 'pinia'
import { CostCreation } from '../components/CostCreation.vue'

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
    },
    deleteCost(cost: CostCreation): void {
      this.costs.splice(this.costs.indexOf(cost), 1)
    }
  },
})
