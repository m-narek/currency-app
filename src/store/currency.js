import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getCurrencies } from "@/services/currency";
import { defaultCurrencies } from "@/utils/currency";
import { convertCurrency } from "@/helpers/currency";

export const useCurrency = defineStore("currency", () => {
  const route = useRoute();
  const router = useRouter();

  const currencies = ref({});
  const isLoading = ref(true);

  const activeCurrency = computed(() =>
    defaultCurrencies.find((item) => item.value === route.query.currency)
  );

  const comparingCurrencies = computed(() =>
    defaultCurrencies.filter((item) => item.value !== route.query.currency)
  );

  const updateActiveCurrency = (currency) => {
    if(route.query.currency !== currency) {
      router.push({ query: { currency } })
    }
  };

  const getConversion = (from, to, amount) => {
    const conversionKey = `${from}-${to}`;
    const symbol = defaultCurrencies.find(item => item.value === to).label;
    const rate = currencies.value[conversionKey];
    const convertedData = convertCurrency(amount, rate, symbol);
    
    return convertedData;
  }

  const getCurrencyList = async () => {
    isLoading.value = true;
    try {
      const response = await getCurrencies();
      currencies.value = response;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    currencies,
    activeCurrency,
    comparingCurrencies,
    getConversion,
    isLoading,

    getCurrencyList,
    updateActiveCurrency
  };
});
