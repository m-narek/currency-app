<template>
  <div
    v-click-outside="handleDropdown"
    class="relative"
  >
    <div 
      class="activator cursor-pointer"
      @click="handleDropdown(true)"
    >
      <slot
        :value="selectedLabel"  
        name="activator"
      >
        {{ selectedLabel }}
      </slot>
    </div>
    <transition name="fade">
      <div
        v-if="isOpen"
        class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden"
        :class="positionClass"
      >
        <ul>
          <li
            v-for="item in items"
            :key="item.value"
            class="cursor-pointer px-4 py-2 hover:bg-indigo-100"
            @click="selectItem(item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  position: {
    type: String,
    default: "right",
    validator: (value) => {
      return ["left", "right"].includes(value);
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedLabel = ref(props.items.find(item => item.value === props.modelValue)?.label);

const positionClass = computed(() =>
  props.position === "left" ? "left-0" : "right-0"
);

const handleDropdown = (val) => {
  isOpen.value = Object.is(val, true);
};

const selectItem = (item) => {
  emit("update:modelValue", item.value);
  handleDropdown(false);
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedLabel.value = props.items.find(item => item.value === newValue)?.label;
  }
);
</script>
