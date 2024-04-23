<template>
  <v-list nav density="compact" slim>
    <v-list-item to="/overview">
      <template v-slot:prepend>
        <v-icon size="small"> mdi-home </v-icon>
      </template>
      <v-list-item-title class="text-caption">概览</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
</script>
