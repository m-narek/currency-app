<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :readonly="readonly"
    :style="{
      height,
    }"
    class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    :class="{ 'focus:outline-none focus:!border-gray-300' : readonly }"
    @input="updateValue"
  >
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "50px",
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}

input[type=number] {
-moz-appearance: textfield;
}
</style>