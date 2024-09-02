<template>
  <div class="home">
    <div 
      v-if="!currenycStore.isLoading" 
      class="currencies-container m-auto w-full max-w-[400px] flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 shadow-lg rounded-xl px-4"
    >
      <div
        v-for="(item, i) in currenycStore.comparingCurrencies"
        :key="`currenyc-${item.value}`"
        class="currency-item flex justify-between text-white py-5"
        :class="{ 'border-b border-yellow-50' : i === 0 }"
      >
        <div class="text-2xl">
          {{ convertCurrency(1, 1, currenycStore.activeCurrency.label) }}
          =
          {{
            currenycStore.getConversion(
              currenycStore.activeCurrency.value,
              item.value,
              1
            )
          }}
        </div>
        <img 
          :src="require(`@/assets/images/flags/${item.value}.svg`)" 
          :alt="`flag-${item.value}`"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrency } from "@/store/currency";
import { convertCurrency } from "@/helpers/currency";

const currenycStore = useCurrency();
</script>