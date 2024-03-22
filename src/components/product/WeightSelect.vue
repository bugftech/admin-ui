<template>
  <AppLabel class="mt-4">重量</AppLabel>
  <v-text-field
    hide-details
    density="compact"
    v-model.trim="internalValue"
    type="number"
    variant="solo-filled"
    flat
  >
    <template v-slot:append>
      <v-select
        hide-details
        variant="solo-filled"
        flat
        :items="weightOptions"
        v-model="selectedUnit"
      >
      </v-select>
    </template>
  </v-text-field>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);


const weightOptions = ["盎司", "磅", "克", "千克", "吨", "克拉"];
const [value, unit] = props.modelValue.split(" ");
const internalValue = ref(value);
const selectedUnit = ref(unit);

watchEffect(() => {
  emit("update:modelValue", `${internalValue.value} ${selectedUnit.value}`);
});
</script>
