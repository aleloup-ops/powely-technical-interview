<script setup lang="ts">
  import { Form, Field, ErrorMessage } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useCostStore } from "../stores/costStore"
  import * as zod from 'zod';
  const props = defineProps({
    cost: {
      type: Object,
      required: true,
    },
  })

  const validationSchema = toTypedSchema(
    zod.object({
      costName: zod.string().min(2).max(50).nonempty("This is required").default(props.cost.costName),
      costCategory: zod.string().min(2).max(50).nonempty("This is required").default(props.cost.costCategory),
      costPrice: zod.number().min(0).max(1000000000).default(props.cost.costPrice),
      costType: zod.string().min(2).max(50).nonempty("This is required").default(props.cost.costType),
      costFrequency: zod.string().default(props.cost.costFrequency),
      costStarting: zod.string().optional(),
      costDescription: zod.string().optional(),
    })
  );

  // Submit handler
  function onSubmit(values: any) {
    const costStore = useCostStore()
    try {
      costStore.updateCost(values);
    } catch (error) {
      console.log(error);
    }
  };

  function removeCost() {
    const costStore = useCostStore()
    costStore.deleteCost(props.cost)
  }
</script>
<template>
  <div class="my-10">
    <div class="w-full flex flex-row pl-5">
      <div class="w-1/6">
        <h2 class="uppercase">{{ props.cost.costType }} [{{ props.cost.costName }}]</h2>
      </div>
      <div class="w-1/6 hidden sm:block">
        <h2>CATEGORY</h2>
      </div>
      <div class="w-1/6 hidden sm:block">
        <h2>COST</h2>
      </div>
      <div class="w-1/6 hidden sm:block">
        <h2>STARTING</h2>
      </div>
    </div>
    <div class="w-full bg-gray-100 py-5 mt-5">
      <div class="px-10 flex flex-col lg:flex-row">
        <div class="w-1/6">
          <p class="font-medium text-xl text-p-black">{{ props.cost.costType }}</p>
        </div>
        <Form
          v-slot="{ values }"
          :validation-schema="validationSchema"
          @submit="onSubmit"
          class="flex flex-col w-full lg:w-2/3"
        >
          <div class="flex flex-col sm:flex-row">
            <div class="w-full sm:w-1/4">
              <Field as="select" name="costCategory" type="text" class="mt-2 w-5/6 px-2 h-10" placeholder="Cost category">
                <option value="aboveGround">Above Ground</option>
                <option value="marketing">Marketing</option>
                <option value="people">People</option>
                <option value="operations">Operations</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage class="errorMessage" name="costCategory" />
            </div>
            <div class="w-full sm:w-1/4">
              <Field name="costPrice" type="text" class="mt-2 w-5/6 px-2 h-10" placeholder="Cost label" />
              <ErrorMessage class="errorMessage" name="costName" />
            </div>
            <div class="w-full sm:w-1/4">
              <Field as="select" name="costStarting" type="text" class="mt-2 w-5/6 px-2 h-10">
                <option value="afterFID">After FID</option>
                <option value="afterCOD">After COD</option>
              </Field>
              <ErrorMessage class="errorMessage" name="costStarting" />
            </div>
            <div class="w-full sm:w-1/4" v-if="values.costType == 'recurrent'">
              <label for="costFrequency">FREQUENCY</label>
              <Field as="select" name="costFrequency" type="text" class="mt-2 w-full lg:w-5/6 px-2 h-10" placeholder="Cost frequency">
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annualy">Annualy</option>
              </Field>
              <ErrorMessage class="errorMessage" name="costFrequency" />
            </div>
          </div>
          <div class="w-full mt-5">
            <h2>DESCRIPTION</h2>
            <Field name="costDescription" type="text" class="mt-2 w-5/6 px-2 h-10" placeholder="Cost description" />
            <ErrorMessage class="errorMessage" name="costDescription" />
          </div>
          <button type="submit" class="btn !mx-auto !mt-5 !w-1/3">UPDATE</button>
        </Form>
        <div class="w-full sm:w-1/6 mt-5 sm:mt-0 flex justify-center">
          <button class="btn-remove !mx-auto" @click="removeCost()">REMOVE</button>
        </div>
      </div>
    </div>
  </div>
</template>