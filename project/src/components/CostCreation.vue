<script setup lang="ts">
  import { Form, Field, ErrorMessage } from "vee-validate";
  import { toTypedSchema } from '@vee-validate/zod';
  import * as zod from 'zod';

  import { useCostStore } from "../stores/costStore";

  const validationSchema = toTypedSchema(
    zod.object({
      costName: zod.string().min(2).max(50).nonempty("This is required"),
      costCategory: zod.string().min(2).max(50).nonempty("This is required"),
      cost: zod.number().min(0).max(1000000000),
      costType: zod.string().min(2).max(50).nonempty("This is required"),
      costFrequency: zod.string().min(2).max(50).nonempty("This is required"),
    })
  );


  // Submit handler
  function onSubmit(values: CostCreation) {
    console.log(values)
    const costStore = useCostStore()
    try {
      costStore.registerCost(values);
    } catch (error) {
      console.log(error);
    }
  };

  export type CostCreation = {
    costName: string;
    costCategory: string;
    cost: number;
    costType: string;
    costFrequency: string;
  }

</script>
<template>
  <div class="w-full bg-yellow-100 py-5">
    <div class=" px-10">
      <Form
        v-slot="{ meta, values }"
        :validation-schema="validationSchema"
        @submit="onSubmit"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 mt-10"
      >
        <div>
          <label for="costName">NEW COST NAME</label>
          <Field name="costName" type="text" class="mt-2 w-5/6 px-2 h-10" placeholder="Cost label" />
          <ErrorMessage class="errorMessage" name="costName" />
        </div>
        <div>
          <label for="costCategory">CATEGORY</label>
          <Field as="select" name="costCategory" type="text" class="mt-2 w-5/6 px-2 h-10" placeholder="Cost category">
            <option value="aboveGround">Above Ground</option>
            <option value="marketing">Marketing</option>
            <option value="people">People</option>
            <option value="operations">Operations</option>
            <option value="other">Other</option>
          </Field>
          <ErrorMessage class="errorMessage" name="costCategory" />
        </div>
        <div>
          <label for="cost">COST</label>
          <div class="relative">
            <Field name="cost" type="number" class="mt-2 w-5/6 px-2 h-10" placeholder="Cost" />
            <p class="absolute top-4 right-10">EUR</p>
          </div>
          <ErrorMessage class="errorMessage" name="cost" />
        </div>
        <div>
          <label for="costType">COST TYPE</label>
          <div class="flex mt-5">
            <div class="w-1/3">
              <Field id="fixedCost" value="fixed" name="costType" type="radio" class="ct hidden" placeholder="costType" />
              <label
                class="ct_labels"
                for="fixedCost"
              >FIXED</label>
            </div>
            <div class="w-1/3">
              <Field id="recurrentCost" value="recurrent" name="costType" type="radio" class="ct hidden" placeholder="costType" />
              <label
                class="ct_labels"
                for="recurrentCost"
              >RECURRENT</label>
            </div>
          </div>
          <ErrorMessage class="errorMessage" name="costType" />
        </div>
        <div v-if="values.costType == 'recurrent'">
          <label for="costFrequency">FREQUENCY</label>
          <Field as="select" name="costFrequency" type="text" class="mt-2 w-5/6 px-2 h-10" placeholder="Cost frequency">
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annualy">Annualy</option>
          </Field>
          <ErrorMessage class="errorMessage" name="costFrequency" />
        </div>
        <div class="flex items-end">
          <button type="submit" :disabled="!meta.valid" class="btn">ADD</button>
        </div>
        <p>{{ values }}</p>

      </Form>
    </div>
  </div>
</template>