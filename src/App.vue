<template>
  <div class="main-container">
    <AppHeader />
    <router-view class="page-container" />
  </div>
</template>

<script setup>
import AppHeader from "@/components/global/AppHeader.vue"

import { useCurrency } from "@/store/currency"

const currenycStore = useCurrency();

currenycStore.getCurrencyList();
</script>

<style scoped>
.page-container {
  height: calc(100vh - 72px);
  display: flex;
}
</style>
