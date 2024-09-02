<template>
  <div class="erros-list w-full flex flex-col gap-2">
    <div 
      v-for="(error, i) in errors"
      :key="`error-${i}`"
      class=" text-red-600"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"

defineProps({
  errors: {
    type: Array,
    required: true
  }
})
</script>