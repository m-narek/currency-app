<template>
  <header
    class="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 shadow-lg"
  >
    <div class="max-w-main-container mx-auto px-6">
      <nav class="flex justify-between items-center py-4 h-[72px]">
        <router-link
          to="/"
          class="text-white font-bold text-2xl transition duration-300"
        >
          CurrencyApp
        </router-link>
        <div class="flex items-center gap-4">
          <router-link
            to="/"
            class="text-white font-semibold relative border-b-2 border-transparent hover:text-yellow-300 transition-all duration-300"
            :class="{ 'border-yellow-300': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link
            to="/convert"
            class="text-white font-semibold relative border-b-2 border-transparent hover:text-yellow-300 transition-all duration-300"
            :class="{ 'border-yellow-300': $route.path === '/convert' }"
          >
            Convert
          </router-link>
          <UiDropdown
            v-if="route.path === '/' && !currenycStore.isLoading"
            :model-value="currenycStore.activeCurrency?.value"
            :items="defaultCurrencies"
            @update:model-value="currenycStore.updateActiveCurrency"
          >
            <template #activator="{ value }">
              <div class="px-4 py-2 text-indigo-600 bg-white rounded-md font-semibold w-[65px]">
                <span>
                  {{ value }}
                </span>
              </div>
            </template>
          </UiDropdown>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router"

import { useCurrency } from "@/store/currency";
import { defaultCurrencies } from "@/utils/currency"

import UiDropdown from "@/components/ui/UiDropdown.vue";


const route = useRoute();
const currenycStore = useCurrency();
</script>

<style scoped></style>
