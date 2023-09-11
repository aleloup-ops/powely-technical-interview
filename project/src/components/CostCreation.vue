<script setup lang="ts">
  import { Form, Field, ErrorMessage } from "vee-validate";
  import { toTypedSchema } from '@vee-validate/zod';
  import * as zod from 'zod';

  import { useCostStore } from "../stores/costStore";


  const validationSchema = toTypedSchema(
    zod.object({
      costName: zod.string().min(2).max(50).nonempty("This is required"),
      costCategory: zod.string().min(2).max(50).nonempty("This is required"),
      costPrice: zod.number().min(0).max(1000000000),
      costType: zod.string().min(2).max(50).nonempty("This is required"),
      costFrequency: zod.string().optional(),
    })
  );


  // Submit handler
  function onSubmit(values: any) {
    const costStore = useCostStore()
    try {
      costStore.registerCost(values);
    } catch (error) {
      console.log(error);
    }
  };

</script>
<template>
  <div class="w-full bg-yellow-100 py-5">
    <div class=" px-10">
      <Form
        v-slot="{ meta, values }"
        :validation-schema="validationSchema"
        @submit="onSubmit"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 mt-10 gap-2"
      >
        <div>
          <label for="costName">NEW COST NAME</label>
          <Field name="costName" type="text" class="mt-2 w-full lg:w-5/6 px-2 h-10" placeholder="Cost label" />
          <ErrorMessage class="errorMessage" name="costName" />
        </div>
        <div class="mt-3 lg:mt-0">
          <label for="costCategory">CATEGORY</label>
          <Field as="select" name="costCategory" type="text" class="mt-2 w-full lg:w-5/6 px-2 h-10" placeholder="Cost category">
            <option value="aboveGround">Above Ground</option>
            <option value="marketing">Marketing</option>
            <option value="people">People</option>
            <option value="operations">Operations</option>
            <option value="other">Other</option>
          </Field>
          <ErrorMessage class="errorMessage" name="costCategory" />
        </div>
        <div class="mt-3 lg:mt-0">
          <label for="costPrice">COST</label>
          <div class="relative">
            <Field name="costPrice" type="number" class="mt-2 w-full lg:w-5/6 px-2 h-10" placeholder="Cost" />
            <p class="absolute top-4 right-10">EUR</p>
          </div>
          <ErrorMessage class="errorMessage" name="costPrice" />
        </div>
        <div class="mt-3 lg:mt-0">
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
        <div class="mt-3 lg:mt-0" v-if="values.costType == 'recurrent'">
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
        <div class="flex items-end mt-10 lg:mt-0">
          <button type="submit" :disabled="!meta.valid" class="btn">ADD</button>
        </div>
      </Form>
      <div class="mt-10">
        <h2>RECOMMANDED COSTS</h2>
        <div class="mt-2 mb-80 lg:mb-24 w-2/3">
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Land Purchase</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Land Rent</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Water an Sewage</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">HR and Personnel</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Hydrogen Storage</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Electrical Work</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Development</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Installation</p>
          </div>
          <div class="tag">
            <font-awesome-icon class="text-black/75" icon="fa-solid fa-xmark" />
            <p class="ml-2">Indirect</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>