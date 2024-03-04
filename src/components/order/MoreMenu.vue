<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        variant="elevated"
        prepend-icon="mdi-dots-horizontal-circle-outline"
        v-bind="props"
        size="small"
      >
        更多的操作
      </v-btn>
    </template>
    <v-list> </v-list>
  </v-menu>
</template>

<script setup></script>
