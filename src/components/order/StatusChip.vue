<template>
  <v-chip :color="color" :prepend-icon="icon" size="x-small"> {{ title }}</v-chip>
</template>

<script setup>
import { toRefs, reactive } from "vue";
// Composables
import { useOrderStatus } from "@/composables/status";
const props = defineProps({
  status: {
    type: Number,
  },
});

const state = reactive({
  color: "",
  title: "",
  icon: "",
});

if (useOrderStatus(props.status)) {
  const item = useOrderStatus(props.status);
  state.color = item.color;
  state.title = item.title;
  state.icon = item.icon;
}

const { color, title, icon } = toRefs(state);
</script>
