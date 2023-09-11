<script setup lang="ts">
  import { useCostStore } from "../stores/costStore"
  const props = defineProps({
    cost: {
      type: Object,
      required: true,
    },
  })

  function removeCost() {
    const costStore = useCostStore()
    costStore.deleteCost(props.cost)
  }
</script>
<template>
  <div class="w-full flex-row">
    <div class="w-1/6">
      <h2 class="uppercase">{{ props.cost.costName }}</h2>
    </div>
    <div class="w-1/6">
      CATEGORY
    </div>
    <div class="w-1/6">
      COST
    </div>
    <div class="w-1/6">
      STARTING
    </div>
  </div>
  <div class="w-full bg-white py-5 my-10">
    <div class="px-10 flex flex-col lg:flex-row">
      <div class="w-1/6">
        <p class="font-medium text-xl text-p-black">{{ props.cost.costType }}</p>
      </div>
      <div class="flex flex-col">
        <div class="w-2/3 flex flex-row">
          <div class="w-1/4">
            <input v-model="props.cost.costCategory"/>
          </div>
          <div class="w-1/4">
            <input v-model="props.cost.costPrice"/>
          </div>
          <div class="w-1/4">
            <select v-model="props.cost.costStarting">
              <option value="afterFID">After FID</option>
              <option value="afterCOD">After COD</option>
            </select>
          </div>
        </div>
        <div class="w-full">
          <h2>DESCRIPTION</h2>
          <textarea v-model="props.cost.costDescription"></textarea>
        </div>
      </div>
      <div class="w-1/6">
        <button class="btn-remove" @click="removeCost()">REMOVE</button>
      </div>
    </div>
  </div>
</template>