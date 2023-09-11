<script setup lang="ts">
  const props = defineProps({
    cost: {
      type: Object,
      required: true,
    },
  })
</script>
<template>
  <div class="w-full bg-yellow-100 py-5">
    <div class="px-10 flex flex-col lg:flex-row">
      <div class="w-1/6">
        <p>{{ props.cost }}</p>
      </div>
      <div class="w-2/3"></div>
      <div class="w-1/6"></div>
    </div>
  </div>
</template>