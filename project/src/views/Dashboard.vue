<script setup lang="ts">
  import CostCreation from "../components/CostCreation.vue";
  import Cost from "../components/Cost.vue"

  import { useCostStore } from "../stores/costStore";

  const costStore = useCostStore()
  let costs = costStore.costs

</script>
<template>
  <div class="container mx-auto">
    <h1>OTHER CAPEX AND OPEX COSTS</h1>
    <CostCreation/>
    <div>
      {{ costs }}
    </div>
    <div
      v-for="(cost, index) in costs"
      :key="index"
    >
      <Cost :cost="cost"/>
    </div>
  </div>
</template>