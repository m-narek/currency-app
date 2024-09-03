<template>
  <div class="w-full">
    <div class="m-auto flex flex-col gap-3 max-w-[400px] w-full items-center">
      <div class="flex gap-2 align-center w-full">
        <UiDropdown
          v-model="convertData.from.currency"
          :items="defaultCurrencies"
          position="left"
        >
          <template #activator="{ value }">
            <div
              class="border border-gray-300 rounded-md shadow-sm p-2 flex items-center gap-2 w-[90px]"
            >
              <img
                :src="
                  require(`@/assets/images/flags/${convertData.from.currency}.svg`)
                "
                :alt="`icon-${convertData.from.currency}`"
              >
              <span>{{ value }}</span>
            </div>
          </template>
        </UiDropdown>
        <UiInput
          v-model="convertData.from.amount"
          class="w-full"
          placeholder="Enter Amount"
          type="text"
        />
      </div>
      <img
        src="@/assets/images/convert.svg"
        class="convert-icon"
        width="40px"
        alt="convert-icon"
      >
      <div class="flex gap-2 align-center w-full">
        <UiDropdown
          v-model="convertData.to.currency"
          :items="defaultCurrencies"
          position="left"
        >
          <template #activator="{ value }">
            <div
              class="border border-gray-300 rounded-md shadow-sm p-2 flex items-center gap-2 w-[90px]"
            >
              <img
                :src="
                  require(`@/assets/images/flags/${convertData.to.currency}.svg`)
                "
                :alt="`icon-${convertData.to.currency}`"
              >
              <span>
                {{ value }}
              </span>
            </div>
          </template>
        </UiDropdown>
        <UiInput
          v-model="convertData.to.amount"
          class="w-full"
          readonly
          type="text"
        />
      </div>
      <div class="error-container h-16 w-full">
        <transition name="fade">
          <UiError
            v-if="errors.length"
            :errors="errors"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import UiDropdown from "@/components/ui/UiDropdown.vue";
import UiInput from "@/components/ui/UiInput.vue";
import UiError from "@/components/ui/UiError.vue";

import { reactive, ref, watchEffect } from "vue";

import { useCurrency } from "@/store/currency";

import { defaultCurrencies } from "@/utils/currency";
import { errorMessages } from "@/utils/errors";

const currencyStore = useCurrency();

const convertData = reactive({
  from: {
    currency: defaultCurrencies[0].value,
    amount: null,
  },
  to: {
    currency: defaultCurrencies[1].value,
    amount: null,
  },
});
const errors = ref([]);

const checkValidation = (condition, messageKey) => {
  if (condition) {
    if (!errors.value.includes(errorMessages[messageKey])) {
      errors.value.push(errorMessages[messageKey]);
    }
  } else {
    errors.value = errors.value.filter(
      (item) => item !== errorMessages[messageKey]
    );
  }
};

watchEffect(() => {
  const isSameCondition = convertData.to.currency === convertData.from.currency;
  checkValidation(isSameCondition, "isSame");

  const invalidAmountCondition = isNaN(Number(convertData.from.amount));

  checkValidation(invalidAmountCondition, "invalidAmount");

  convertData.to.amount = currencyStore.getConversion(
    convertData.from.currency,
    convertData.to.currency,
    convertData.from.amount
  );
});
</script>

<style scoped>
.convert-icon {
  filter: invert(25%) sepia(72%) saturate(2894%) hue-rotate(237deg)
    brightness(90%) contrast(100%);
}
</style>
